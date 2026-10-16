import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../Styles/home.css";
import { Petals, petalBurst } from "../components/Petals";
import { ALL_ITEMS, formatCOP } from "./Menudata";

/* ═══════════════ HELPERS ═══════════════ */
const CDN = "https://res.cloudinary.com/k44zr7ap";
// Cloudinary: formato/calidad automáticos y ancho justo → carga mucho más rápido
const cld = (url, t = "f_auto,q_auto,w_1080") => url.replace("/upload/", `/upload/${t}/`);
const videoPoster = (url, w = 720) => cld(url, `so_0,f_jpg,q_auto,w_${w}`).replace(/\.mp4$/, ".jpg");

const PHONE = "573148258077";
const wa = (text = "") => `https://wa.me/${PHONE}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const LOGO = cld(`${CDN}/image/upload/v1792119360/SaveClip.App_278629253_548069456836188_8890126742816850499_n.jpg`, "f_auto,q_auto,w_400");

// 🎬 Videos: cambia el título de cada card a tu gusto
const VIDEOS = [
	{ title: "El jardín", src: `${CDN}/video/upload/v1792119346/SaveClip.App_AQNQhvr3Y_KLHo_RoiV7REbFjYCHsLaWPaWfhsV-08LKU8NDu4-nC9nuqOLsj6cLrDiWLcBqHkEeoV-4g_6A1xJYm31vxK9LxS7NZb4.mp4` },
	{ title: "Celebraciones", src: `${CDN}/video/upload/v1792119352/SaveClip.App_AQPO2fOvAGJdFpsi21xeBa_6TKK2O7ZRQK78BIxNxj8WCxkbjkp8Q1SfUmA8LYD-iqnic0RTd5OhXIazAhnid_C_35mq3QtNgoJy4Rg.mp4` },
	{ title: "Así se vive", src: `${CDN}/video/upload/v1792119369/SaveClip.App_AQMyxX50Zy5bN3f7WBdA1yFj6GKuhj9xbp63iopItPQJSwCaDC87AMwPGJh3d96QVSc1SWHlE4xlWuqQd4epU7tElXdhi5tduyoWpSA.mp4` },
];

const SOCIALS = [
	{ id: "wa", label: "WhatsApp", url: wa(), icon: "whatsapp" },
	{ id: "ig", label: "Instagram", url: "https://www.instagram.com/deleitegarden", icon: "instagram" },
	{ id: "tt", label: "TikTok", url: "https://www.tiktok.com/@deleitegarden", icon: "tiktok" },
];

const LINKS = [
	{ id: "chat", title: "Chatea con nosotros", sub: "Resolvemos tus dudas por WhatsApp", url: wa("¡Hola Deleite Garden! Tengo una pregunta:"), icon: "whatsapp", tone: "forest" },
	{ id: "ig", title: "Síguenos en Instagram", sub: "@deleitegarden · 14,6 mil deleitelovers", url: "https://www.instagram.com/deleitegarden", icon: "instagram", tone: "blush" },
	{ id: "tt", title: "Míranos en TikTok", sub: "Lo que pasa en el jardín, en video", url: "https://www.tiktok.com/@deleitegarden", icon: "tiktok", tone: "ink" },
	{ id: "map", title: "Cómo llegar", sub: "Calle 8 Sur #37-21", url: "https://www.google.com/maps/search/?api=1&query=Deleite+Garden+Restaurante+Calle+8+Sur+%2337-21", icon: "pin", tone: "cream" },
];

const OCCASIONS = [
	{ id: "cumple", label: "Cumpleaños", emoji: "🎂" },
	{ id: "amor", label: "Aniversario", emoji: "💐" },
	{ id: "grado", label: "Grado", emoji: "🎓" },
	{ id: "pedida", label: "Pedida de mano", emoji: "💍" },
	{ id: "amigas", label: "Plan con amigos", emoji: "🥂" },
	{ id: "porque", label: "Solo porque sí", emoji: "🌸" },
];
const DAYS = ["Hoy", "Mañana", "Este fin de semana", "Otra fecha"];

// Platos que entran a la ruleta (solo comida, con preferencia a los que tienen foto)
const ROULETTE_POOL = ALL_ITEMS.filter((i) => !["sin-alcohol", "otras-bebidas"].includes(i.section) && i.id !== "adiciones" && i.id !== "adicion-camarones");

const FAN = [
	"https://i.pinimg.com/1200x/af/31/0c/af310c900d122cd643866754a12a17ec.jpg",
	"https://i.pinimg.com/1200x/6d/e3/17/6de317fc36e279be74a2cbb81ab5c452.jpg",
	"https://i.pinimg.com/736x/d6/52/4e/d6524e64f8b8bb2fd5f42be090c24e41.jpg",
];

/* ═══════════════ ICONOS ═══════════════ */
const Icon = ({ name, size = 22 }) => {
	const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
	switch (name) {
		case "whatsapp":
			return (<svg {...p}><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>);
		case "instagram":
			return (<svg {...p}><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/></svg>);
		case "tiktok":
			return (<svg {...p}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.86.13V9.4a6.34 6.34 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z"/></svg>);
		case "pin":
			return (<svg {...p}><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>);
		case "arrow":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
		case "sound":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>);
		case "mute":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m22 9-6 6M16 9l6 6"/></svg>);
		case "verified":
			return (<svg {...p}><path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.65.15-.44.23-.92.23-1.41 0-2.2-1.7-3.99-3.8-3.99-.47 0-.92.08-1.33.25C14.8 2.43 13.48 1.5 12 1.5s-2.8.93-3.42 2.2a3.6 3.6 0 0 0-1.33-.25c-2.1 0-3.8 1.79-3.8 4 0 .49.08.97.23 1.4A4.13 4.13 0 0 0 1.5 12.5c0 1.5.8 2.8 1.97 3.5-.03.21-.05.42-.05.64 0 2.2 1.7 3.98 3.8 3.98.47 0 .92-.09 1.34-.25.62 1.26 1.94 2.13 3.44 2.13s2.82-.87 3.44-2.13c.42.16.87.25 1.34.25 2.1 0 3.8-1.78 3.8-3.98 0-.22-.02-.43-.05-.64a4.1 4.1 0 0 0 1.97-3.5Zm-12.34 4.4-3.6-3.6 1.36-1.36 2.24 2.24 5.3-5.3 1.36 1.36-6.66 6.66Z"/></svg>);
		case "play":
			return (<svg {...p}><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z"/></svg>);
		case "close":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>);
		case "chev-l":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>);
		case "chev-r":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>);
		case "dice":
			return (<svg {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>);
		default:
			return null;
	}
};

/* ═══════════════ HOOKS ═══════════════ */
// Aparece suave cuando entra en pantalla
const useReveal = () => {
	useEffect(() => {
		const els = document.querySelectorAll(".dg-reveal");
		if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
		const io = new IntersectionObserver(
			(entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
};

/* ═══════════════ VIDEOS EN CARDS + VISOR ═══════════════ */
const VideoReel = () => {
	const [open, setOpen] = useState(null);
	const refs = useRef([]);
	const go = useCallback((d) => setOpen((o) => (o + d + VIDEOS.length) % VIDEOS.length), []);

	useEffect(() => {
		if (open === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(null);
			if (e.key === "ArrowRight") go(1);
			if (e.key === "ArrowLeft") go(-1);
		};
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
	}, [open, go]);

	// en computador: al pasar el mouse la card se reproduce en silencio
	const preview = (i, on) => {
		const v = refs.current[i];
		if (!v) return;
		if (on) v.play().catch(() => {});
		else { v.pause(); v.currentTime = 0; }
	};

	return (
		<section className="dg-videos dg-reveal" aria-labelledby="dg-videos-title">
			<div className="dg-videos-head">
				<div>
					<span className="dg-chip-label">En video</span>
					<h2 id="dg-videos-title">Así se vive el jardín</h2>
				</div>
				<a className="dg-videos-more" href="https://www.tiktok.com/@deleitegarden" target="_blank" rel="noopener noreferrer">
					Ver más <Icon name="arrow" size={14} />
				</a>
			</div>

			<div className="dg-video-grid">
				{VIDEOS.map((v, i) => (
					<button
						key={v.src}
						className="dg-vcard"
						style={{ "--i": i }}
						onClick={() => setOpen(i)}
						onMouseEnter={() => preview(i, true)}
						onMouseLeave={() => preview(i, false)}
						aria-label={`Ver video: ${v.title}`}
					>
						<video ref={(el) => (refs.current[i] = el)} src={cld(v.src, "q_auto,w_360")} poster={videoPoster(v.src, 360).replace("so_0", "so_1")} muted loop playsInline preload="none" />
						<span className="dg-vcard-play"><Icon name="play" size={16} /></span>
						<span className="dg-vcard-title">{v.title}</span>
					</button>
				))}
			</div>

			{open !== null &&
				createPortal(
					<div className="dg-lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={VIDEOS[open].title}>
						<div className="dg-lb-frame" onClick={(e) => e.stopPropagation()}>
							<video key={VIDEOS[open].src} src={cld(VIDEOS[open].src, "q_auto,w_720")} autoPlay controls playsInline onEnded={() => go(1)} />
							<button className="dg-lb-btn dg-lb-close" onClick={() => setOpen(null)} aria-label="Cerrar"><Icon name="close" size={20} /></button>
							<button className="dg-lb-btn dg-lb-prev" onClick={() => go(-1)} aria-label="Video anterior"><Icon name="chev-l" size={22} /></button>
							<button className="dg-lb-btn dg-lb-next" onClick={() => go(1)} aria-label="Video siguiente"><Icon name="chev-r" size={22} /></button>
							<div className="dg-lb-dots" aria-hidden="true">
								{VIDEOS.map((_, i) => <i key={i} className={i === open ? "is-on" : ""} />)}
							</div>
						</div>
					</div>,
					document.body
				)}
		</section>
	);
};

/* ═══════════════ AVATAR CON ANILLO GIRATORIO ═══════════════ */
const RingAvatar = () => (
	<div className="dg-avatar">
		<svg className="dg-ring" viewBox="0 0 200 200" aria-hidden="true">
			<defs>
				<path id="dgCircle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
			</defs>
			<text>
				<textPath href="#dgCircle" startOffset="0">DELEITE ✿ GARDEN ✿ RESTAURANTE</textPath>
			</text>
		</svg>
		<div className="dg-avatar-img">
			<img src={LOGO} alt="Logo Deleite Garden" />
		</div>
		<span className="dg-avatar-bloom" aria-hidden="true">🌸</span>
	</div>
);

/* ═══════════════ RESERVA TU MESA ═══════════════ */
const Reservation = () => {
	const [occ, setOcc] = useState("cumple");
	const [people, setPeople] = useState(2);
	const [day, setDay] = useState("Este fin de semana");
	const [deco, setDeco] = useState(false);

	const o = OCCASIONS.find((x) => x.id === occ);
	const message = useMemo(
		() =>
			[
				"¡Hola Deleite Garden! Quiero reservar una mesa:",
				`• Ocasión: ${o.label}`,
				`• Personas: ${people}`,
				`• Día: ${day}`,
				deco ? "• Quiero la decoración + vela volcán" : null,
				"¿Qué disponibilidad tienen?",
			].filter(Boolean).join("\n"),
		[o, people, day, deco]
	);

	return (
		<section className="dg-reserve dg-reveal" aria-labelledby="dg-reserve-title">
			<div className="dg-reserve-head">
				<span className="dg-chip-label">Reservas</span>
				<h2 id="dg-reserve-title">¿Qué celebramos?</h2>
				<p>Arma tu reserva en 3 toques y te la enviamos lista por WhatsApp.</p>
			</div>

			<div className="dg-occasions" role="radiogroup" aria-label="Ocasión">
				{OCCASIONS.map((x) => (
					<button
						key={x.id}
						role="radio"
						aria-checked={occ === x.id}
						className={`dg-occ ${occ === x.id ? "is-on" : ""}`}
						onClick={() => setOcc(x.id)}
					>
						<span className="dg-occ-emoji">{x.emoji}</span>
						<span>{x.label}</span>
					</button>
				))}
			</div>

			<div className="dg-reserve-row">
				<span className="dg-row-label">Personas</span>
				<div className="dg-stepper">
					<button onClick={() => setPeople((p) => Math.max(1, p - 1))} aria-label="Menos personas">−</button>
					<output key={people}>{people}</output>
					<button onClick={() => setPeople((p) => Math.min(40, p + 1))} aria-label="Más personas">+</button>
				</div>
			</div>

			<div className="dg-days" role="radiogroup" aria-label="Día">
				{DAYS.map((d) => (
					<button key={d} role="radio" aria-checked={day === d} className={`dg-day ${day === d ? "is-on" : ""}`} onClick={() => setDay(d)}>
						{d}
					</button>
				))}
			</div>

			<label className={`dg-deco ${deco ? "is-on" : ""}`}>
				<input type="checkbox" checked={deco} onChange={(e) => setDeco(e.target.checked)} />
				<span className="dg-switch" aria-hidden="true"><i /></span>
				<span className="dg-deco-text">
					<strong>Decoración + vela volcán 🎉</strong>
					<small>{formatCOP(50)} · sorprende a quien más quieres</small>
				</span>
			</label>

			<a className="dg-cta" href={wa(message)} target="_blank" rel="noopener noreferrer" onClick={(e) => petalBurst(e, 22)}>
				<Icon name="whatsapp" size={20} />
				Reservar por WhatsApp
			</a>
		</section>
	);
};

/* ═══════════════ RULETA DEL ANTOJO ═══════════════ */
const ROW_H = 58;
const Roulette = () => {
	const [reel, setReel] = useState(() => [ROULETTE_POOL.find((i) => i.img) || ROULETTE_POOL[0]]);
	const [offset, setOffset] = useState(0);
	const [animate, setAnimate] = useState(false);
	const [spinning, setSpinning] = useState(false);
	const [winner, setWinner] = useState(null);

	const spin = (e) => {
		if (spinning) return;
		petalBurst(e, 10);
		const pick = () => ROULETTE_POOL[Math.floor(Math.random() * ROULETTE_POOL.length)];
		// 70% de probabilidad de caer en un plato con foto (se ve más rico 😋)
		const withPhoto = ROULETTE_POOL.filter((i) => i.img);
		const win = withPhoto.length && Math.random() < 0.7 ? withPhoto[Math.floor(Math.random() * withPhoto.length)] : pick();
		const current = reel[reel.length - 1];
		const filler = Array.from({ length: 22 }, pick);
		const next = [current, ...filler, win];
		setWinner(null);
		setAnimate(false);
		setOffset(0);
		setReel(next);
		setSpinning(true);
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				setAnimate(true);
				setOffset(-(next.length - 1) * ROW_H);
			})
		);
	};

	const onEnd = () => {
		if (!spinning) return;
		setSpinning(false);
		setWinner(reel[reel.length - 1]);
		try { navigator.vibrate?.([10, 40, 20]); } catch { /* */ }
	};

	return (
		<section className="dg-roulette dg-reveal" aria-labelledby="dg-roulette-title">
			<div className="dg-roulette-head">
				<span className="dg-chip-label dg-chip-label--light">¿No sabes qué pedir?</span>
				<h2 id="dg-roulette-title">La ruleta del antojo</h2>
			</div>

			<div className={`dg-reel ${spinning ? "is-spinning" : ""}`}>
				<div
					className="dg-reel-track"
					style={{ transform: `translateY(${offset}px)`, transition: animate ? "transform 3.2s cubic-bezier(.12,.75,.12,1)" : "none" }}
					onTransitionEnd={onEnd}
				>
					{reel.map((it, i) => (
						<div className="dg-reel-row" key={`${it.id}-${i}`} style={{ height: ROW_H }}>
							{it.name}
						</div>
					))}
				</div>
				<span className="dg-reel-pointer dg-reel-pointer--l" aria-hidden="true">✿</span>
				<span className="dg-reel-pointer dg-reel-pointer--r" aria-hidden="true">✿</span>
			</div>

			<div className={`dg-win ${winner ? "is-on" : ""}`} aria-live="polite">
				{winner && (
					<>
						<div className="dg-win-photo">
							{winner.img ? <img src={winner.img} alt={winner.name} /> : <span>🍽️</span>}
						</div>
						<div className="dg-win-info">
							<small>{winner.sectionTitle}</small>
							<strong>{winner.name}</strong>
							<span>{formatCOP(winner.price)}</span>
						</div>
						<Link className="dg-win-go" to={`/menu?plato=${winner.id}`} aria-label={`Ver ${winner.name} en la carta`}>
							<Icon name="arrow" size={18} />
						</Link>
					</>
				)}
			</div>

			<button className="dg-spin" onClick={spin} disabled={spinning}>
				<Icon name="dice" size={18} />
				{spinning ? "Girando…" : winner ? "Otra vez" : "Girar la ruleta"}
			</button>
		</section>
	);
};

/* ═══════════════ HOME ═══════════════ */
export const Home = () => {
	useReveal();

	return (
		<div className="dg-home">


			<main className="dg-sheet" id="jardin">
				<Petals count={16} />
				<span className="dg-blob dg-blob--a" aria-hidden="true" />
				<span className="dg-blob dg-blob--b" aria-hidden="true" />

				<section className="dg-profile">
					<RingAvatar />
					<h2 className="dg-name">
						<span className="dg-script">Deleite</span>
						<span className="dg-script">Garden</span>
					</h2>
					<p className="dg-handle">
						@deleitegarden <span className="dg-verified"><Icon name="verified" size={16} /></span>
					</p>
					<p className="dg-bio">Restaurante temático · Sabores que florecen en nuestro jardín 🌿</p>

					<div className="dg-pills">
						<span className="dg-pill">📍 Calle 8 Sur #37-21</span>
						<span className="dg-pill">💚 14,6 mil deleitelovers</span>
					</div>

					<nav className="dg-socials" aria-label="Redes sociales">
						{SOCIALS.map((s, i) => (
							<a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`dg-social dg-social--${s.id}`} style={{ "--i": i }}>
								<Icon name={s.icon} size={22} />
							</a>
						))}
					</nav>
				</section>

				{/* ── LA CARTA (link estrella) ── */}
				<Link to="/menu" className="dg-menu-card dg-reveal" onClick={(e) => petalBurst(e, 18)}>
					<div className="dg-fan" aria-hidden="true">
						{FAN.map((src, i) => (
							<img key={i} src={src} alt="" style={{ "--i": i }} />
						))}
					</div>
					<div className="dg-menu-copy">
						<span className="dg-chip-label">Carta digital</span>
						<h3>Descubre el menú</h3>
						<p>Entradas, pastas, cortes, postres y cocteles de autor.</p>
						<span className="dg-menu-go">
							Abrir la carta <Icon name="arrow" size={18} />
						</span>
					</div>
					<span className="dg-shine" aria-hidden="true" />
				</Link>

				<div className="dg-links">
					{LINKS.map((l, i) => (
						<a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className={`dg-link dg-link--${l.tone} dg-reveal`} style={{ "--d": `${i * 80}ms` }}>
							<span className="dg-link-ico"><Icon name={l.icon} size={22} /></span>
							<span className="dg-link-text">
								<strong>{l.title}</strong>
								<small>{l.sub}</small>
							</span>
							<span className="dg-link-arrow"><Icon name="arrow" size={18} /></span>
						</a>
					))}
				</div>

				<VideoReel />

				<Reservation />

				<Roulette />

				<footer className="dg-foot dg-reveal">
					<img src={LOGO} alt="" className="dg-foot-logo" />
					<p className="dg-script dg-foot-tag">#DeleiteLovers</p>
					<small>Deleite Garden · Restaurante temático · {new Date().getFullYear()}</small>
				</footer>
			</main>
		</div>
	);
};