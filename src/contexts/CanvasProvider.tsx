import { useCallback, useEffect, useRef } from "react";
import { CanvasContext } from "./canvas.context";

interface CanvasProviderProps {
	width: number;
	height: number;
	children?: React.ReactNode;
}

export const CanvasProvider = ({
	width,
	height,
	children,
}: CanvasProviderProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const drawCallbacks = useRef<
		Map<string, (ctx: CanvasRenderingContext2D) => void>
	>(new Map());

	const registerDraw = useCallback(
		(id: string, draw: (ctx: CanvasRenderingContext2D) => void) => {
			drawCallbacks.current.set(id, draw);
		},
		[]
	);

	const unregisterDraw = useCallback((id: string) => {
		drawCallbacks.current.delete(id);
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const render = () => {
			if (contextRef.current) {
				contextRef.current.clearRect(0, 0, width, height);
				drawCallbacks.current.forEach((draw) => {
					draw(contextRef.current!);
				});
			}
			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [width, height]);

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			if (ctx) {
				contextRef.current = ctx;
			}
		}
	}, []);

	return (
		<>
			<canvas ref={canvasRef} width={width} height={height} />
			<CanvasContext.Provider value={{ registerDraw, unregisterDraw }}>
				{children}
			</CanvasContext.Provider>
		</>
	);
};
