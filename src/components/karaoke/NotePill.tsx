import { useContext, useEffect, useId } from "react";
import { CanvasContext } from "../../contexts/canvas.context";

const drawPill = (
	ctx: CanvasRenderingContext2D,
	position: { x: number; y: number },
	length: number,
	text: string
) => {
	ctx.save();
	ctx.translate(position.x, position.y);
	ctx.beginPath();
	ctx.moveTo(0, 20);
	ctx.lineTo(length, 20);
	ctx.lineTo(length, 40);
	ctx.lineTo(0, 40);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.fillStyle = "black";
	ctx.fillText(text, 10, 50);
	ctx.restore();
};

export const NotePill = ({
	x,
	y,
	length,
	text,
}: {
	x: number;
	y: number;
	length: number;
	text: string;
}) => {
	const context = useContext(CanvasContext);
	const _id = useId();

	useEffect(() => {
		if (context) {
			context.registerDraw(_id, (ctx) =>
				drawPill(ctx, { x, y }, length, text)
			);
			return () => context.unregisterDraw(_id);
		}
	});
	return <div></div>;
};
