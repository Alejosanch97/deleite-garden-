import { useMemo } from "react";

/* ═══════════════════════════════════════════════════════════
   Pétalos de cerezo + hojitas cayendo (fondo vivo del jardín)
   y una explosión de pétalos para los clics importantes.
   Los estilos viven en home.css (clases .dg-petal*, .dg-burst*)
   ═══════════════════════════════════════════════════════════ */

const rnd = (a, b) => a + Math.random() * (b - a);

export const Petals = ({ count = 18, className = "" }) => {
	const petals = useMemo(
		() =>
			Array.from({ length: count }, (_, i) => ({
				id: i,
				left: rnd(0, 100),
				size: rnd(9, 18),
				dur: rnd(9, 18),
				delay: -rnd(0, 18),
				sway: rnd(30, 90) * (Math.random() > 0.5 ? 1 : -1),
				leaf: i % 5 === 0,
			})),
		[count]
	);

	return (
		<div className={`dg-petals ${className}`} aria-hidden="true">
			{petals.map((p) => (
				<span
					key={p.id}
					className={`dg-petal ${p.leaf ? "is-leaf" : ""}`}
					style={{
						left: `${p.left}%`,
						width: `${p.size}px`,
						height: `${p.size * 0.82}px`,
						animationDuration: `${p.dur}s, ${p.dur / 3}s`,
						animationDelay: `${p.delay}s, ${p.delay}s`,
						"--sway": `${p.sway}px`,
					}}
				/>
			))}
		</div>
	);
};

/* Explosión de pétalos en la posición del clic */
export const petalBurst = (e, n = 16) => {
	if (typeof document === "undefined") return;
	if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	const x = e?.clientX ?? window.innerWidth / 2;
	const y = e?.clientY ?? window.innerHeight / 2;
	for (let i = 0; i < n; i++) {
		const el = document.createElement("span");
		el.className = `dg-burst ${i % 4 === 0 ? "is-leaf" : ""}`;
		const ang = (Math.PI * 2 * i) / n + rnd(-0.3, 0.3);
		const dist = rnd(60, 140);
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
		el.style.setProperty("--tx", `${Math.cos(ang) * dist}px`);
		el.style.setProperty("--ty", `${Math.sin(ang) * dist - 40}px`);
		el.style.setProperty("--rot", `${rnd(-260, 260)}deg`);
		document.body.appendChild(el);
		setTimeout(() => el.remove(), 1100);
	}
	try { navigator.vibrate?.(12); } catch { /* sin vibración */ }
};