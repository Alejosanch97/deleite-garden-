import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Styles/menu.css";
import { Petals, petalBurst } from "../components/Petals";
import { MENU, ALL_ITEMS, TAGS, WELCOME, formatCOP } from "../pages/Menudata";
import acuarela from "../assets/img/acuarela.jpg";

/* ═══════════════ CONFIG ═══════════════ */
const PHONE = "573148258077";
const wa = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
const LOGO = "https://res.cloudinary.com/k44zr7ap/image/upload/f_auto,q_auto,w_200/v1792119360/SaveClip.App_278629253_548069456836188_8890126742816850499_n.jpg";
const STORAGE_KEY = "dg-mesa";
// 📄 Menú en PDF (archivo en la carpeta public/). Si lo subes a otro lado, pega aquí el link.
const PDF_URL = "/menu-deleite-garden.pdf";
const HEADER_OFFSET = 122; // alto de la barra superior + chips de categorías
const FEATURED = ALL_ITEMS.filter((i) => i.img);
const BY_ID = Object.fromEntries(ALL_ITEMS.map((i) => [i.id, i]));
const SECTION_BY_ID = Object.fromEntries(MENU.map((s) => [s.id, s]));

const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const readMesa = () => {
	try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
};

/* ═══════════════ ICONOS ═══════════════ */
const I = {
	pdf: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
	back: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>,
	plate: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="13" r="7" /><circle cx="12" cy="13" r="3.5" /><path d="M3 4v5M5 4v16M1 4v5c0 1 1 2 2 2h0M21 4c-1.5 1-2 3-2 5s1 3 2 3v8" /></svg>,
	search: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
	close: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>,
	plus: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>,
	wa: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>,
};

/* Ramita entre "Deleite" y "Garden", como en el logo */
const Sprig = ({ className = "" }) => (
	<svg className={className} viewBox="0 0 60 40" aria-hidden="true">
		<path d="M6 34 C 20 26, 34 18, 54 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		<ellipse cx="18" cy="24" rx="6" ry="3" transform="rotate(-50 18 24)" fill="currentColor" />
		<ellipse cx="28" cy="22" rx="6" ry="3" transform="rotate(30 28 22)" fill="currentColor" />
		<ellipse cx="34" cy="13" rx="6" ry="3" transform="rotate(-50 34 13)" fill="currentColor" />
		<ellipse cx="44" cy="12" rx="6" ry="3" transform="rotate(30 44 12)" fill="currentColor" />
	</svg>
);

/* ═══════════════ PRECIO ═══════════════ */
const Price = ({ k }) => <span className="mn-price">${k}<small>k</small></span>;

/* ═══════════════ FILA DE PLATO ═══════════════ */
const Dish = ({ item, qty, onOpen, onAdd, flash }) => (
	<li id={`dish-${item.id}`} className={`mn-dish ${item.img ? "has-img" : ""} ${flash ? "is-flash" : ""}`}>
		<button className="mn-dish-main" onClick={() => onOpen(item)}>
			<span className="mn-dish-line">
				<span className="mn-dish-name">{item.name}</span>
				<span className="mn-dots" aria-hidden="true" />
				<Price k={item.price} />
			</span>
			{item.desc && <span className="mn-dish-desc">{item.desc}</span>}
			{item.tags?.length > 0 && (
				<span className="mn-tags">
					{item.tags.map((t) => (
						<span key={t} className={`mn-tag mn-tag--${t}`}>{TAGS[t].icon} {TAGS[t].label}</span>
					))}
				</span>
			)}
		</button>
		{item.img && (
			<button className="mn-dish-thumb" onClick={() => onOpen(item)} aria-label={`Ver foto de ${item.name}`}>
				<img src={item.img} alt="" loading="lazy" />
			</button>
		)}

	</li>
);

/* ═══════════════ SECCIÓN ═══════════════ */
const Section = ({ section, items, mesa, onOpen, onAdd, flashId, index }) => (
	<section id={`sec-${section.id}`} className={`mn-section mn-tone--${section.tone} ${index % 2 ? "is-flip" : ""}`} data-section={section.id}>
		<span className="mn-wash mn-wash--a" aria-hidden="true" />
		<span className="mn-wash mn-wash--b" aria-hidden="true" />

		<header className="mn-sec-head mn-reveal">
			<div className="mn-arch">
				<span className="mn-arch-back" aria-hidden="true" />
				{section.cover ? <img src={section.cover} alt="" loading="lazy" /> : <span className="mn-arch-emoji">{section.emoji}</span>}
			</div>
			<div className="mn-sec-title">
				<small>{section.subtitle}</small>
				<h2>{section.title}</h2>
				<span className="mn-sec-count">{items.length} {items.length === 1 ? "opción" : "opciones"}</span>
			</div>
		</header>

		<ul className="mn-list">
			{items.map((it) => (
				<Dish key={it.id} item={it} qty={mesa[it.id]} onOpen={onOpen} onAdd={onAdd} flash={flashId === it.id} />
			))}
		</ul>

		{section.note && <p className="mn-note">✿ {section.note}</p>}
	</section>
);

/* ═══════════════ HOJA DEL PLATO (bottom sheet) ═══════════════ */
const DishSheet = ({ item, qty, onClose, onAdd, onRemove }) => {
	const [drag, setDrag] = useState(0);
	const start = useRef(null);
	const section = item ? SECTION_BY_ID[item.section] : null;

	useEffect(() => {
		if (!item) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [item, onClose]);

	if (!item) return null;

	const onTouchStart = (e) => (start.current = e.touches[0].clientY);
	const onTouchMove = (e) => start.current !== null && setDrag(Math.max(0, e.touches[0].clientY - start.current));
	const onTouchEnd = () => { if (drag > 110) onClose(); setDrag(0); start.current = null; };

	return (
		<div className="mn-overlay" onClick={onClose}>
			<div
				className="mn-sheet"
				role="dialog"
				aria-modal="true"
				aria-label={item.name}
				onClick={(e) => e.stopPropagation()}
				style={drag ? { transform: `translateY(${drag}px)`, transition: "none" } : undefined}
			>
				<div className="mn-sheet-grab" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}><i /></div>
				<button className="mn-sheet-close" onClick={onClose} aria-label="Cerrar">{I.close}</button>

				<div className="mn-sheet-media">
					{item.img ? (
						<img src={item.img} alt={item.name} />
					) : (
						<div className="mn-sheet-illu" style={{ backgroundImage: `url(${acuarela})` }}>
							<span>{section?.emoji}</span>
						</div>
					)}
				</div>

				<div className="mn-sheet-body">
					<small className="mn-sheet-sec">{section?.subtitle} · {section?.title}</small>
					<h3>{item.name}</h3>
					<p className="mn-sheet-price">{formatCOP(item.price)}</p>
					{item.desc && <p className="mn-sheet-desc">{item.desc}</p>}
					{item.tags?.length > 0 && (
						<div className="mn-tags">
							{item.tags.map((t) => <span key={t} className={`mn-tag mn-tag--${t}`}>{TAGS[t].icon} {TAGS[t].label}</span>)}
						</div>
					)}
					{section?.note && <p className="mn-sheet-note">✿ {section.note}</p>}

				</div>
			</div>
		</div>
	);
};

/* ═══════════════ MI MESA (drawer) ═══════════════ */
const MesaDrawer = ({ open, mesa, onClose, onAdd, onRemove, onClear }) => {
	const lines = Object.entries(mesa).map(([id, q]) => ({ item: BY_ID[id], q })).filter((l) => l.item);
	const total = lines.reduce((s, l) => s + l.item.price * l.q, 0);
	const count = lines.reduce((s, l) => s + l.q, 0);
	const message = [
		"¡Hola Deleite Garden! Armé mi mesa desde la carta digital:",
		...lines.map((l) => `• ${l.q}x ${l.item.name} (${formatCOP(l.item.price * l.q)})`),
		`Total estimado: ${formatCOP(total)}`,
		"¿Me ayudan con la reserva?",
	].join("\n");

	return (
		<div className={`mn-drawer-wrap ${open ? "is-open" : ""}`} aria-hidden={!open}>
			<div className="mn-overlay mn-overlay--soft" onClick={onClose} />
			<aside className="mn-drawer" role="dialog" aria-modal="true" aria-label="Mi mesa">
				<header className="mn-drawer-head">
					<div>
						<small>Tu selección</small>
						<h3>Mi mesa</h3>
					</div>
					<button className="mn-sheet-close mn-sheet-close--static" onClick={onClose} aria-label="Cerrar">{I.close}</button>
				</header>

				{lines.length === 0 ? (
					<div className="mn-empty">
						<span>🍽️</span>
						<p>Tu mesa está vacía.</p>
						<small>Toca el <b>+</b> de cualquier plato para empezar a armarla.</small>
					</div>
				) : (
					<>
						<ul className="mn-mesa-list">
							{lines.map(({ item, q }) => (
								<li key={item.id}>
									<div className="mn-mesa-thumb">{item.img ? <img src={item.img} alt="" /> : <span>{SECTION_BY_ID[item.section].emoji}</span>}</div>
									<div className="mn-mesa-info">
										<strong>{item.name}</strong>
										<span>{formatCOP(item.price * q)}</span>
									</div>
									<div className="mn-qty mn-qty--sm">
										<button onClick={() => onRemove(item)} aria-label="Quitar uno">−</button>
										<output key={q}>{q}</output>
										<button onClick={(e) => onAdd(item, e)} aria-label="Agregar uno">+</button>
									</div>
								</li>
							))}
						</ul>
						<div className="mn-total">
							<span>{count} {count === 1 ? "producto" : "productos"} · total estimado</span>
							<strong>{formatCOP(total)}</strong>
						</div>
						<a className="mn-send" href={wa(message)} target="_blank" rel="noopener noreferrer" onClick={(e) => petalBurst(e, 24)}>
							{I.wa} Enviar mi mesa por WhatsApp
						</a>
						<button className="mn-clear" onClick={onClear}>Vaciar mesa</button>
					</>
				)}
			</aside>
		</div>
	);
};

/* ═══════════════ PÁGINA MENÚ ═══════════════ */
export const Menu = () => {
	const [params] = useSearchParams();
	const [query, setQuery] = useState("");
	const [tag, setTag] = useState(null);
	const [active, setActive] = useState(MENU[0].id);
	const [sheet, setSheet] = useState(null);
	const [drawer, setDrawer] = useState(false);
	const [mesa, setMesa] = useState(readMesa);
	const [flashId, setFlashId] = useState(null);
	const [bump, setBump] = useState(0);
	const [quote, setQuote] = useState(0);
	const [scrolled, setScrolled] = useState(false);
	const navRef = useRef(null);
	const mesaBtnRef = useRef(null);

	/* ── persistencia de la mesa ── */
	useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(mesa)); } catch { /* modo privado */ } }, [mesa]);

	const count = Object.values(mesa).reduce((a, b) => a + b, 0);
	const total = Object.entries(mesa).reduce((s, [id, q]) => s + (BY_ID[id]?.price || 0) * q, 0);

	/* ── filtros ── */
	const sections = useMemo(() => {
		const q = norm(query.trim());
		return MENU.map((s) => ({
			section: s,
			items: s.items.filter((it) => (!tag || it.tags?.includes(tag)) && (!q || norm(`${it.name} ${it.desc || ""} ${s.title}`).includes(q))),
		})).filter((s) => s.items.length);
	}, [query, tag]);
	const filtering = Boolean(query.trim() || tag);

	/* ── agregar con "vuelo" hasta Mi mesa ── */
	const fly = (e) => {
		const target = mesaBtnRef.current?.getBoundingClientRect();
		if (!e?.currentTarget || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const from = e.currentTarget.getBoundingClientRect();
		const dot = document.createElement("span");
		dot.className = "mn-fly";
		dot.textContent = "✿";
		document.body.appendChild(dot);
		const x0 = from.left + from.width / 2, y0 = from.top + from.height / 2;
		const x1 = target.left + target.width / 2, y1 = target.top + target.height / 2;
		const anim = dot.animate(
			[
				{ transform: `translate(${x0}px, ${y0}px) scale(.6)`, opacity: 1 },
				{ transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - 90}px) scale(1.4) rotate(180deg)`, opacity: 1, offset: 0.5 },
				{ transform: `translate(${x1}px, ${y1}px) scale(.5) rotate(360deg)`, opacity: 0.4 },
			],
			{ duration: 750, easing: "cubic-bezier(.4,0,.2,1)" }
		);
		anim.onfinish = () => { dot.remove(); setBump((b) => b + 1); };
	};

	const add = useCallback((item, e) => {
		fly(e);
		setMesa((m) => ({ ...m, [item.id]: (m[item.id] || 0) + 1 }));
		try { navigator.vibrate?.(10); } catch { /* */ }
	}, []);
	const remove = useCallback((item) => {
		setMesa((m) => {
			const n = { ...m };
			if ((n[item.id] || 0) <= 1) delete n[item.id]; else n[item.id] -= 1;
			return n;
		});
	}, []);

	/* ── scroll suave a una sección ── */
	const goTo = (id) => {
		const el = document.getElementById(`sec-${id}`);
		if (!el) return;
		window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 6, behavior: "smooth" });
	};

	/* ── scroll-spy: resalta la categoría que estás viendo ── */
	useEffect(() => {
		const els = document.querySelectorAll(".mn-section");
		const io = new IntersectionObserver(
			(entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.dataset.section)),
			{ rootMargin: `-${HEADER_OFFSET + 20}px 0px -60% 0px` }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [sections]);

	// centra el chip activo dentro de la barra
	useEffect(() => {
		const nav = navRef.current;
		const chip = nav?.querySelector(`[data-chip="${active}"]`);
		if (!nav || !chip) return;
		nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
	}, [active]);

	/* ── reveal + barra compacta al bajar ── */
	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
			{ threshold: 0.12 }
		);
		document.querySelectorAll(".mn-reveal:not(.is-in)").forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [sections]);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const id = setInterval(() => setQuote((q) => (q + 1) % WELCOME.length), 6000);
		return () => clearInterval(id);
	}, []);

	/* ── viene de la ruleta: /menu?plato=id ── */
	useEffect(() => {
		const id = params.get("plato");
		const item = id && BY_ID[id];
		if (!item) return;
		const t1 = setTimeout(() => {
			const el = document.getElementById(`dish-${id}`);
			if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 40, behavior: "smooth" });
			setFlashId(id);
		}, 350);
		const t2 = setTimeout(() => setSheet(item), 1300);
		const t3 = setTimeout(() => setFlashId(null), 3200);
		return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
	}, [params]);

	/* ── bloquea el scroll del fondo con modales abiertos ── */
	useEffect(() => {
		document.body.style.overflow = sheet || drawer ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [sheet, drawer]);

	return (
		<div className="mn-page">
			{/* ── Barra superior ── */}
			<div className={`mn-top ${scrolled ? "is-scrolled" : ""}`}>
				<Link to="/" className="mn-icon-btn" aria-label="Volver al inicio">{I.back}</Link>
				<div className="mn-top-brand">
					<img src={LOGO} alt="" />
					<span className="mn-script">Deleite Garden</span>
				</div>
				<a className="mn-pdf-btn" href={PDF_URL} target="_blank" rel="noopener noreferrer" aria-label="Ver menú en PDF">
					{I.pdf}
					<span>PDF</span>
				</a>
			</div>

			{/* ── Portada ── */}
			<header className="mn-hero" style={{ backgroundImage: `url(${acuarela})` }}>
				<Petals count={12} className="mn-hero-petals" />
				<div className="mn-hero-inner">
					<h1 className="mn-logo">
						<span className="mn-script">Deleite</span>
						<Sprig className="mn-sprig" />
						<span className="mn-script">Garden</span>
					</h1>
					<p className="mn-restaurante">Restaurante</p>
					<p className="mn-hero-menu">Menú</p>
					<p className="mn-quote" key={quote}>“{WELCOME[quote]}”</p>
				</div>
				<div className="mn-hero-fade" />
			</header>

			{/* ── Buscador + filtros ── */}
			<div className="mn-tools">
				<label className="mn-search">
					{I.search}
					<input type="search" placeholder="¿Qué se te antoja hoy?" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Buscar en el menú" />
					{query && <button onClick={() => setQuery("")} aria-label="Borrar búsqueda">{I.close}</button>}
				</label>
				<div className="mn-filters" role="group" aria-label="Filtros">
					{Object.entries(TAGS).map(([k, t]) => (
						<button key={k} className={`mn-filter ${tag === k ? "is-on" : ""}`} onClick={() => setTag((x) => (x === k ? null : k))} aria-pressed={tag === k}>
							<span>{t.icon}</span> {t.label}
						</button>
					))}
				</div>
			</div>

			{/* ── Favoritos del jardín ── */}
			{!filtering && (
				<section className="mn-featured mn-reveal" aria-label="Favoritos del jardín">
					<div className="mn-featured-head">
						<h2 className="mn-script">Favoritos del jardín</h2>
						<small>desliza →</small>
					</div>
					<div className="mn-featured-track">
						{FEATURED.map((it, i) => (
							<button key={it.id} className="mn-feat" style={{ "--i": i }} onClick={() => setSheet(it)}>
								<span className="mn-feat-img"><img src={it.img} alt="" loading="lazy" /></span>
								<span className="mn-feat-name">{it.name}</span>
								<Price k={it.price} />
							</button>
						))}
					</div>
				</section>
			)}

			{/* ── Categorías (sticky) ── */}
			<nav className="mn-nav" ref={navRef} aria-label="Categorías">
				{sections.map(({ section }) => (
					<button key={section.id} data-chip={section.id} className={`mn-chip ${active === section.id ? "is-active" : ""}`} onClick={() => goTo(section.id)}>
						<span>{section.emoji}</span> {section.title}
					</button>
				))}
			</nav>

			{/* ── Carta ── */}
			<main className="mn-main">
				{sections.length === 0 ? (
					<div className="mn-empty mn-empty--page">
						<span>🌿</span>
						<p>No encontramos ese antojo…</p>
						<button onClick={() => { setQuery(""); setTag(null); }}>Ver toda la carta</button>
					</div>
				) : (
					sections.map(({ section, items }, i) => (
						<Section key={section.id} index={i} section={section} items={items} mesa={mesa} onOpen={setSheet} onAdd={add} flashId={flashId} />
					))
				)}

				<footer className="mn-foot">
					<Sprig className="mn-sprig mn-sprig--foot" />
					<p className="mn-script">Gracias por visitarnos</p>
					<small>Precios en pesos colombianos · “k” = miles</small>
					<a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="mn-foot-pdf">
						{I.pdf} Ver la carta en PDF
					</a>
					<Link to="/" className="mn-foot-link">← Volver al inicio</Link>
				</footer>
			</main>

			<MesaDrawer open={drawer} mesa={mesa} onClose={() => setDrawer(false)} onAdd={add} onRemove={remove} onClear={() => setMesa({})} />

			<DishSheet item={sheet} qty={sheet ? mesa[sheet.id] : 0} onClose={() => setSheet(null)} onAdd={add} onRemove={remove} />
			<MesaDrawer open={drawer} mesa={mesa} onClose={() => setDrawer(false)} onAdd={add} onRemove={remove} onClear={() => setMesa({})} />
		</div>
	);
};