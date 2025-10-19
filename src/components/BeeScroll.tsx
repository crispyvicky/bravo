// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function BeeScroll() {
// 	const initializedRef = useRef(false);
// 	const [colorIndex, setColorIndex] = useState(0);

// 	useEffect(() => {
// 		if (initializedRef.current) return;
// 		initializedRef.current = true;

// 		if (typeof window === "undefined") return;
// 		gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// 		gsap.set("#motionSVG", { scale: 0.85, autoAlpha: 1 });
// 		gsap.set("#bee", { transformOrigin: "50% 50%", scaleX: -1 });
// 		const getProp = gsap.getProperty("#motionSVG");
// 		let flippedX = false;
// 		let flippedY = false;

// 		const tween = gsap.to("#motionSVG", {
// 			scrollTrigger: {
// 				trigger: document.body,
// 				start: "top top",
// 				end: "bottom bottom",
// 				scrub: 0.7,
// 				markers: false,
// 				onUpdate: (self) => {
// 					const rotation = getProp("rotation") as number;
// 					const flipY = Math.abs(rotation) > 90;
// 					const flipX = self.direction === 1;
// 					if (flipY !== flippedY || flipX !== flippedX) {
// 						gsap.to("#bee", {
// 							scaleY: flipY ? -1 : 1,
// 							scaleX: flipX ? -1 : 1,
// 							duration: 0.25,
// 						});
// 						flippedY = flipY;
// 						flippedX = flipX;
// 					}
// 				},
// 			},
// 			duration: 10,
// 			ease: pathEase("#motionPath", { smooth: true }),
// 			immediateRender: true,
// 			motionPath: {
// 				path: "#motionPath",
// 				align: "#motionPath",
// 				alignOrigin: [0.5, 0.5],
// 				autoRotate: 0,
// 			},
// 		});

// 		return () => {
// 			tween.scrollTrigger?.kill();
// 			tween.kill();
// 		};
// 	}, []);

// 	const hue = (colorIndex * 18) % 360;
// 	const colorFilter = `hue-rotate(${hue}deg) saturate(1.2) contrast(1.05)`;

// 	return (
// 		<div style={{ position: "fixed", inset: 0, zIndex: 30, pointerEvents: "none" }}>
// 			<svg
// 				id="bee-scroll"
// 				xmlns="http://www.w3.org/2000/svg"
// 				xmlnsXlink="http://www.w3.org/1999/xlink"
// 				x="0px"
// 				y="0px"
// 				viewBox="0 0 1588.4 2762.3"
// 				style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
// 			>
// 				<defs>
// 					<clipPath id="clip-path">
// 						<rect id="Rectangle_2885" width="89.252" height="72.066" fill="none" />
// 					</clipPath>
// 				</defs>
// 				<style type="text/css">{`.st0{fill:none;}`}</style>
// 				<path
// 					id="motionPath"
// 					className="st0"
// 					d="M30,50
// 					   C 500,150 1200,10 1550,160
// 					   S 80,560 50,950
// 					   S 1530,1200 1550,1600
// 					   S 60,1950 40,2250
// 					   S 1540,2550 1560,2720
// 					   S 900,2760 800,2792"
// 					stroke="none"
// 				/>
// 				<g id="motionSVG" data-name="Group 1117">
// 					<g
// 						id="bee"
// 						onClick={() => setColorIndex((i) => (i + 1) % 20)}
// 						style={{ pointerEvents: "auto", cursor: "pointer", filter: colorFilter }}
// 					>
// 						<g id="Group_1025" data-name="Group 1025" clipPath="url(#clip-path)">
// 							<path id="Path_332" d="M24.057,55.335c-7.948,5.428-11.332,14.306-7.56,19.829s13.273,5.6,21.22.172,11.332-14.306,7.56-19.829-13.273-5.6-21.22-.172" transform="translate(-11.365 -38.999)" fill="#f4bb01"/>
// 							<path id="Path_333" d="M157.5,150.972c2.7-9.9-6.786-21.1-21.182-25.025s-28.253.919-30.95,10.816,6.786,21.1,21.182,25.025,28.253-.919,30.95-10.816" transform="translate(-79.734 -94.686)" fill="#f4bb01"/>
// 							<path id="Path_334" d="M146.889,177.281s1.339-19.463,19.962-22.318" transform="translate(-111.637 -117.774)" fill="#f4bb01"/>
// 							<path id="Path_335" d="M234.862,212.262s-6.479-13.1,4.49-21.97" transform="translate(-177.054 -144.624)" fill="#f4bb01"/>
// 							<path id="Path_336" d="M190.35,61.76c-1.181,10.465,3.757,19.615,11.029,20.436s14.126-7,15.307-17.463S212.93,45.118,205.657,44.3s-14.126,7-15.307,17.463" transform="translate(-144.536 -33.621)" fill="#f4bb01"/>
// 							<path id="Path_337" d="M216.247,95.353c-10.069,3.089-16.491,11.265-14.344,18.262s12.049,10.165,22.118,7.076,16.491-11.265,14.344-18.262-12.049-10.165-22.118-7.076" transform="translate(-153.134 -71.57)" fill="#f4bb01"/>
							
// 							<path id="Path_338" d="M86.5,55.229a17.228,17.228,0,0,1-4.724-1.091,17.651,17.651,0,0,0-.645-6.232,23.879,23.879,0,0,0,4.336-4.227c3.459-4.4,4.6-9.332,3.2-13.876s-5.1-7.987-10.433-9.693a23.008,23.008,0,0,0-3.679-.842,23.054,23.054,0,0,0-1.586-3.7c-2.66-4.928-6.725-7.935-11.449-8.469s-9.357,1.492-13.049,5.7A27.053,27.053,0,0,0,42.4,26.543a33.332,33.332,0,0,0-4.365.8C39.7,22.664,39.288,18,36.885,14.477c-2.352-3.444-6.422-5.508-11.243-5.737-.9-2.254-3.321-6.9-8.276-8.331C13.03-.843,8.265.779,3.2,5.227a3.6,3.6,0,0,0,4.753,5.408c3-2.636,5.627-3.813,7.4-3.314A5.314,5.314,0,0,1,18.1,9.757a27.6,27.6,0,0,0-7.443,3.606A25.351,25.351,0,0,0,1.153,24.932C-.681,29.741-.314,34.575,2.158,38.195S9,43.915,14.146,43.956h.162a23.034,23.034,0,0,0,7.521-1.33c-.979,5.528.849,11.34,5.24,16.527a37.576,37.576,0,0,0,18.8,11.42,41.586,41.586,0,0,0,10.9,1.492,34.1,34.1,0,0,0,10.273-1.519c2.755-.572,8.829-3.2,19.9-14.04a.747.747,0,0,0-.444-1.278M60.718,14.253c2.515.284,4.653,2.2,6.085,5.034a30.848,30.848,0,0,0-4.746,1.054,28.717,28.717,0,0,0-11.038,6.209q-.644-.072-1.286-.122c1.5-7.293,6.234-12.709,10.985-12.176M8.1,34.134c-2.6-3.809.429-10.6,6.618-14.826a18.441,18.441,0,0,1,10.016-3.394h.1c1.618.013,4.563.371,6.1,2.623,2.6,3.809-.429,10.6-6.618,14.826s-13.616,4.58-16.218.771M32.527,54.457c-3.182-3.781-4.4-7.84-3.418-11.434s4.11-6.5,8.8-8.139a24.311,24.311,0,0,1,4.245-1.053,27.735,27.735,0,0,0,.769,4.52,26.315,26.315,0,0,0-7.884,9.432,33.191,33.191,0,0,0-2.515,6.673m19.819,5.728a25.528,25.528,0,0,0,.659,4.459,35.692,35.692,0,0,1-5.241-1.015,34.137,34.137,0,0,1-8.99-3.866l.068,0c.037-.492.779-9,7.059-14.556a18.408,18.408,0,0,0,1.752,2.272,15.776,15.776,0,0,0,5.823,4.426,20.908,20.908,0,0,0-1.13,8.275m21.949-4.846c-.983,3.608-4.11,6.5-8.8,8.139a24.708,24.708,0,0,1-5.013,1.161A15.724,15.724,0,0,1,60.5,53.767a26.421,26.421,0,0,0,2.691.138,29.952,29.952,0,0,0,8.746-1.343c.891-.273,1.76-.588,2.608-.933a9.679,9.679,0,0,1-.255,3.709m-4.464-9.66c-8.017,2.46-16.086.312-17.62-4.69-.92-3,.846-5.872,1.981-7.317a20.45,20.45,0,0,1,9.978-6.448A22.8,22.8,0,0,1,70.816,26.2c5.4,0,9.871,2.12,10.973,5.711.92,3-.846,5.872-1.981,7.317a20.455,20.455,0,0,1-9.978,6.448" transform="translate(0 0)" fill="#291f00"/>
// 						</g>
// 					</g>
// 				</g>
// 			</svg>
// 		</div>
// 	);
// }

// function pathEase(
// 	path: string | SVGPathElement,
// 	config: { smooth?: boolean | number; precision?: number; axis?: "x" | "y" } = {}
// ) {
// 	const axis = config.axis || "y";
// 	const precision = config.precision || 1;
// 	const rawPath = MotionPathPlugin.cacheRawPathMeasurements(
// 		MotionPathPlugin.getRawPath(
// 			gsap.utils.toArray(path as any)[0] as SVGPathElement
// 		),
// 		Math.round(precision * 12)
// 	);
// 	const useX = axis === "x";
// 	const start = rawPath[0][useX ? 0 : 1] as number;
// 	const end = rawPath[rawPath.length - 1][
// 		rawPath[rawPath.length - 1].length - (useX ? 2 : 1)
// 	] as number;
// 	const range = end - start;
// 	let l = Math.round(precision * 200);
// 	const inc = 1 / l;
// 	const positions: number[] = [0];
// 	const a: number[] = [0];
// 	let minIndex = 0;
// 	const smoothIdx: number[] = [0];
// 	const minChange = (1 / l) * 0.6;
// 	const smoothRange =
// 		config.smooth === true ? 7 : Math.round((config.smooth as number) || 0);
// 	const fullSmoothRange = smoothRange * 2;
// 	const getClosest = (p: number) => {
// 		while (positions[minIndex] <= p && minIndex++ < l) {}
// 		a.push(
// 			a.length &&
// 				(((p - positions[minIndex - 1]) /
// 					(positions[minIndex] - positions[minIndex - 1])) *
// 					inc +
// 					minIndex * inc)
// 		);
// 		smoothRange &&
// 			a.length > smoothRange &&
// 			a[a.length - 1] - a[a.length - 2] < minChange &&
// 			smoothIdx.push(a.length - smoothRange);
// 	};
// 	for (let i = 1; i < l; i++) {
// 		positions[i] =
// 			((MotionPathPlugin.getPositionOnPath(rawPath as any, i / l) as any)[
// 				axis
// 			] - start) / range;
// 	}
// 	positions[l] = 1;
// 	for (let i = 0; i < l; i++) {
// 		getClosest(i / l);
// 	}
// 	a.push(1);
// 	if (smoothRange) {
// 		smoothIdx.push(l - fullSmoothRange + 1);
// 		smoothIdx.forEach((i) => {
// 			const startVal = a[i];
// 			const j = Math.min(i + fullSmoothRange, l);
// 			const increment = (a[j] - startVal) / (j - i);
// 			let c = 1;
// 			i++;
// 			for (; i < j; i++) {
// 				a[i] = startVal + increment * c++;
// 			}
// 		});
// 	}
// 	l = a.length - 1;
// 	return (p: number) => {
// 		const i = p * l;
// 		const s = a[i | 0];
// 		return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
// 	};
// }


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BeeScroll() {
	const initializedRef = useRef(false);
	const motionRef = useRef<SVGPathElement | null>(null);
	const beeRef = useRef<SVGGElement | null>(null);
	const idleSpinRef = useRef<gsap.core.Tween | null>(null);
	const idleBobRef = useRef<gsap.core.Tween | null>(null);
	const idleTimerRef = useRef<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [colorIndex, setColorIndex] = useState(0);
	const [msgIndex, setMsgIndex] = useState(0);
	const [showMsg, setShowMsg] = useState(false);
	const [beePos, setBeePos] = useState({ x: 0, y: 0 });

	const messages = [
		"Your dreams are closer than you think!",
		"Small steps every day lead to big results.",
		"Believe in your vision and take action.",
		"Success is built one step at a time.",
		"Every challenge is an opportunity to grow.",
		"Focus, and everything else falls into place.",
		"You are stronger than your excuses.",
		"Consistency is the key to mastery.",
		"Turn ideas into reality, one click at a time.",
		"Great things start with bold moves.",
		"Keep going, the best is yet to come!",
		"Your effort today shapes your success tomorrow.",
		"Think big, start small, move fast.",
		"Challenges are just stepping stones.",
		"Creativity + action = impact.",
		"Your work can inspire others, keep pushing!",
		"Stay curious, keep learning, achieve more.",
		"Every idea has potential; nurture it.",
		"Dream it, plan it, do it.",
		"Your persistence defines your legacy."
	];

	useEffect(() => {
		// detect mobile/touch devices and track resize changes
		const updateIsMobile = () => {
			if (typeof window === "undefined") return;
			const touch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
			const narrow = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
			setIsMobile(!!(touch || narrow));
		};
		updateIsMobile();
		window.addEventListener("resize", updateIsMobile);
		return () => window.removeEventListener("resize", updateIsMobile);
	}, []);

	useEffect(() => {
		if (initializedRef.current) return;
		initializedRef.current = true;

		if (typeof window === "undefined") return;
		gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

		const bee = beeRef.current;
		const path = motionRef.current;
		if (!bee || !path) return;

		gsap.set(bee, { transformOrigin: "50% 50%", scaleX: -1 });

		const getProp = gsap.getProperty("#motionSVG");
		let flippedX = false;
		let flippedY = false;

		const startIdle = () => {
			if (!beeRef.current) return;
			if (!idleSpinRef.current) {
				idleSpinRef.current = gsap.to(beeRef.current, {
					scale: 1.03,
					yoyo: true,
					repeat: -1,
					duration: 2,
					ease: "sine.inOut",
					transformOrigin: "50% 50%",
				});
			}
			if (!idleBobRef.current) {
				idleBobRef.current = gsap.to(beeRef.current, {
					x: 6,
					y: -8,
					yoyo: true,
					repeat: -1,
					duration: 0.9,
					ease: "sine.inOut",
				});
			}
		};

		const stopIdle = () => {
			idleSpinRef.current?.kill();
			idleBobRef.current?.kill();
			idleSpinRef.current = null;
			idleBobRef.current = null;
			if (beeRef.current) gsap.set(beeRef.current, { x: 0, y: 0 });
		};

		const tween = gsap.to("#motionSVG", {
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.7,
				markers: false,
				onUpdate: (self) => {
					const rotation = getProp("rotation") as number;
					const flipY = Math.abs(rotation) > 90;
					const flipX = self.direction === 1;
					if (flipY !== flippedY || flipX !== flippedX) {
						gsap.to(bee, {
							scaleY: flipY ? -1 : 1,
							scaleX: flipX ? -1 : 1,
							duration: 0.25,
						});
						flippedY = flipY;
						flippedX = flipX;
					}

					// Stop idle animations while scrolling, start when idle
					stopIdle();
					if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
					idleTimerRef.current = window.setTimeout(() => startIdle(), 350);

					// Update bee position for cloud
					const progress = self.progress;
					const raw = MotionPathPlugin.getRawPath(path);
					const pos = MotionPathPlugin.getPositionOnPath(raw as any, progress) as { x: number; y: number };
					setBeePos({ x: pos.x, y: pos.y });
				},
			},
			duration: 10,
			ease: pathEase("#motionPath", { smooth: true }),
			immediateRender: true,
			motionPath: {
				path: "#motionPath",
				align: "#motionPath",
				alignOrigin: [0.5, 0.5],
				autoRotate: 0,
			},
		});

		return () => {
			stopIdle();
			if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, []);

	const handleBeeClick = (e: React.MouseEvent<SVGGElement>) => {
		// On mobile, only cycle colors; don't show message bubble
		if (!isMobile) {
			// Update message position to the exact click point (viewport coords)
			setBeePos({ x: e.clientX, y: e.clientY });
			setMsgIndex((i) => (i + 1) % messages.length);
			setShowMsg(true);
		}
		setColorIndex((i) => (i + 1) % 20);
	};

	useEffect(() => {
		if (!showMsg) return;
		const hide = () => setShowMsg(false);
		window.addEventListener("mousemove", hide, { once: true });
		return () => window.removeEventListener("mousemove", hide);
	}, [showMsg]);

	const hue = (80 + colorIndex * 18) % 360; // Start with green (120°) and cycle
	const colorFilter = `hue-rotate(${hue}deg) saturate(1.2) contrast(1.05)`;
	const textColor = `hsl(${hue}, 80%, 20%)`; // match bee color

	return (
		<div style={{ position: "fixed", inset: 0, zIndex: 30, pointerEvents: "none" }}>
			<svg
				id="bee-scroll"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 1588.4 2762.3"
				style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
			>
				<defs>
					<clipPath id="clip-path">
						<rect id="Rectangle_2885" width="89.252" height="72.066" fill="none" />
					</clipPath>
				</defs>
				<style type="text/css">{`.st0{fill:none;}`}</style>

				<path
					id="motionPath"
					ref={motionRef}
					className="st0"
					d="M30,50
					   C 500,150 1200,10 1550,160
					   S 80,560 50,950
					   S 1530,1200 1550,1600
					   S 60,1950 40,2250
					   S 1540,2550 1560,2720
					   S 900,2760 800,2792"
					stroke="none"
				/>

				<g id="motionSVG" data-name="Group 1117">
					<g
						id="bee"
						ref={beeRef}
						onClick={handleBeeClick}
						style={{ pointerEvents: "auto", cursor: "pointer", filter: colorFilter }}
					>
						<g id="Group_1025" data-name="Group 1025" clipPath="url(#clip-path)">
							<path id="Path_332" d="M24.057,55.335c-7.948,5.428-11.332,14.306-7.56,19.829s13.273,5.6,21.22.172,11.332-14.306,7.56-19.829-13.273-5.6-21.22-.172" transform="translate(-11.365 -38.999)" fill="#f4bb01"/>
							<path id="Path_333" d="M157.5,150.972c2.7-9.9-6.786-21.1-21.182-25.025s-28.253.919-30.95,10.816,6.786,21.1,21.182,25.025,28.253-.919,30.95-10.816" transform="translate(-79.734 -94.686)" fill="#f4bb01"/>
							<path id="Path_334" d="M146.889,177.281s1.339-19.463,19.962-22.318" transform="translate(-111.637 -117.774)" fill="#f4bb01"/>
							<path id="Path_335" d="M234.862,212.262s-6.479-13.1,4.49-21.97" transform="translate(-177.054 -144.624)" fill="#f4bb01"/>
							<path id="Path_336" d="M190.35,61.76c-1.181,10.465,3.757,19.615,11.029,20.436s14.126-7,15.307-17.463S212.93,45.118,205.657,44.3s-14.126,7-15.307,17.463" transform="translate(-144.536 -33.621)" fill="#f4bb01"/>
							<path id="Path_337" d="M216.247,95.353c-10.069,3.089-16.491,11.265-14.344,18.262s12.049,10.165,22.118,7.076,16.491-11.265,14.344-18.262-12.049-10.165-22.118-7.076" transform="translate(-153.134 -71.57)" fill="#f4bb01"/>
							<path id="Path_338" d="M86.5,55.229a17.228,17.228,0,0,1-4.724-1.091,17.651,17.651,0,0,0-.645-6.232,23.879,23.879,0,0,0,4.336-4.227c3.459-4.4,4.6-9.332,3.2-13.876s-5.1-7.987-10.433-9.693a23.008,23.008,0,0,0-3.679-.842,23.054,23.054,0,0,0-1.586-3.7c-2.66-4.928-6.725-7.935-11.449-8.469s-9.357,1.492-13.049,5.7A27.053,27.053,0,0,0,42.4,26.543a33.332,33.332,0,0,0-4.365.8C39.7,22.664,39.288,18,36.885,14.477c-2.352-3.444-6.422-5.508-11.243-5.737-.9-2.254-3.321-6.9-8.276-8.331C13.03-.843,8.265.779,3.2,5.227a3.6,3.6,0,0,0,4.753,5.408c3-2.636,5.627-3.813,7.4-3.314A5.314,5.314,0,0,1,18.1,9.757a27.6,27.6,0,0,0-7.443,3.606A25.351,25.351,0,0,0,1.153,24.932C-.681,29.741-.314,34.575,2.158,38.195S9,43.915,14.146,43.956h.162a23.034,23.034,0,0,0,7.521-1.33c-.979,5.528.849,11.34,5.24,16.527a37.576,37.576,0,0,0,18.8,11.42,41.586,41.586,0,0,0,10.9,1.492,34.1,34.1,0,0,0,10.273-1.519c2.755-.572,8.829-3.2,19.9-14.04a.747.747,0,0,0-.444-1.278M60.718,14.253c2.515.284,4.653,2.2,6.085,5.034a30.848,30.848,0,0,0-4.746,1.054,28.717,28.717,0,0,0-11.038,6.209q-.644-.072-1.286-.122c1.5-7.293,6.234-12.709,10.985-12.176M8.1,34.134c-2.6-3.809.429-10.6,6.618-14.826a18.441,18.441,0,0,1,10.016-3.394h.1c1.618.013,4.563.371,6.1,2.623,2.6,3.809-.429,10.6-6.618,14.826s-13.616,4.58-16.218.771M32.527,54.457c-3.182-3.781-4.4-7.84-3.418-11.434s4.11-6.5,8.8-8.139a24.311,24.311,0,0,1,4.245-1.053,27.735,27.735,0,0,0,.769,4.52,26.315,26.315,0,0,0-7.884,9.432,33.191,33.191,0,0,0-2.515,6.673m19.819,5.728a25.528,25.528,0,0,0,.659,4.459,35.692,35.692,0,0,1-5.241-1.015,34.137,34.137,0,0,1-8.99-3.866l.068,0c.037-.492.779-9,7.059-14.556a18.408,18.408,0,0,0,1.752,2.272,15.776,15.776,0,0,0,5.823,4.426,20.908,20.908,0,0,0-1.13,8.275m21.949-4.846c-.983,3.608-4.11,6.5-8.8,8.139a24.708,24.708,0,0,1-5.013,1.161A15.724,15.724,0,0,1,60.5,53.767a26.421,26.421,0,0,0,2.691.138,29.952,29.952,0,0,0,8.746-1.343c.891-.273,1.76-.588,2.608-.933a9.679,9.679,0,0,1-.255,3.709m-4.464-9.66c-8.017,2.46-16.086.312-17.62-4.69-.92-3,.846-5.872,1.981-7.317a20.45,20.45,0,0,1,9.978-6.448A22.8,22.8,0,0,1,70.816,26.2c5.4,0,9.871,2.12,10.973,5.711.92,3-.846,5.872-1.981,7.317a20.455,20.455,0,0,1-9.978,6.448" transform="translate(0 0)" fill="#291f00"/>
						</g>
					</g>
				</g>
			</svg>

			{/* Motivational cloud with tail */}
	{showMsg && !isMobile && (
				<div
					className="absolute pointer-events-auto"
					style={{
						left: beePos.x,
						top: beePos.y - 80,
						transform: "translate(-50%, -100%)",
						transition: "left 0.1s, top 0.1s",
					}}
				>
					<div
						style={{
							position: "relative",
							background: "white",
							padding: "0.5rem 1rem",
							borderRadius: "1.5rem",
							boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
						}}
					>
						<p
							style={{
								color: textColor,
								fontWeight: 600,
								fontSize: "0.875rem",
								margin: 0,
							}}
						>
							{messages[msgIndex]}
						</p>
						{/* Tail */}
						<div
							style={{
								position: "absolute",
								bottom: "-10px",
								left: "50%",
								width: "0",
								height: "0",
								borderLeft: "10px solid transparent",
								borderRight: "10px solid transparent",
								borderTop: `10px solid white`,
								transform: "translateX(-50%)",
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

function pathEase(
    path: string | SVGPathElement,
    config: { smooth?: boolean | number; precision?: number; axis?: "x" | "y" } = {}
) {
    const axis = config.axis || "y";
    const precision = config.precision || 1;
	const rawPath = MotionPathPlugin.cacheRawPathMeasurements(
		MotionPathPlugin.getRawPath(
			gsap.utils.toArray(path as any)[0] as SVGPathElement
		),
		Math.round(precision * 12)
	);
    const useX = axis === "x";
	const start = rawPath[0][useX ? 0 : 1] as number;
	const end = rawPath[rawPath.length - 1][
		rawPath[rawPath.length - 1].length - (useX ? 2 : 1)
	] as number;
	const range = end - start;
	let l = Math.round(precision * 200);
	const inc = 1 / l;
	const positions: number[] = [0];
	const a: number[] = [0];
	let minIndex = 0;
	const smoothIdx: number[] = [0];
	const minChange = (1 / l) * 0.6;
	const smoothRange =
		config.smooth === true ? 7 : Math.round((config.smooth as number) || 0);
	const fullSmoothRange = smoothRange * 2;
	const getClosest = (p: number) => {
		while (positions[minIndex] <= p && minIndex++ < l) {}
		a.push(
			a.length &&
				(((p - positions[minIndex - 1]) /
					(positions[minIndex] - positions[minIndex - 1])) *
					inc +
					minIndex * inc)
		);
		smoothRange &&
			a.length > smoothRange &&
			a[a.length - 1] - a[a.length - 2] < minChange &&
			smoothIdx.push(a.length - smoothRange);
	};
	for (let i = 1; i < l; i++) {
		positions[i] =
			((MotionPathPlugin.getPositionOnPath(rawPath as any, i / l) as any)[
				axis
			] - start) / range;
	}
	positions[l] = 1;
	for (let i = 0; i < l; i++) {
		getClosest(i / l);
	}
	a.push(1);
	if (smoothRange) {
		smoothIdx.push(l - fullSmoothRange + 1);
		smoothIdx.forEach((i) => {
			const startVal = a[i];
			const j = Math.min(i + fullSmoothRange, l);
			const increment = (a[j] - startVal) / (j - i);
			let c = 1;
			i++;
			for (; i < j; i++) {
				a[i] = startVal + increment * c++;
			}
		});
	}
	l = a.length - 1;
    return (p: number) => {
        const i = p * l;
        const s = a[i | 0];
        return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
    };
}
