import { createContext } from "react";

export const CanvasContext = createContext<{
	registerDraw: (
		id: string,
		draw: (ctx: CanvasRenderingContext2D) => void
	) => void;
	unregisterDraw: (id: string) => void;
} | null>(null);
