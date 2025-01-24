import { useContext, useEffect, useId } from "react";
import { CanvasContext } from "../../contexts/canvas.context";

const drawTimeMark = (
	ctx: CanvasRenderingContext2D,
	phraseMillis: number,
	ms: number
) => {
	const w = ctx.canvas.width;
	const h = ctx.canvas.width;
	const ratio = ms / phraseMillis;
	const x = w * ratio;

	ctx.beginPath();
	ctx.moveTo(x, 0);
	ctx.lineTo(x, h);
	ctx.stroke();
};

export const TimeMarker = ({
	phraseMillis,
	mark,
}: {
	phraseMillis: number;
	mark: number;
}) => {
	const context = useContext(CanvasContext);
	const _id = useId();

	useEffect(() => {
		if (context) {
			context.registerDraw(_id, (ctx) =>
				drawTimeMark(ctx, phraseMillis, mark)
			);
			return () => context.unregisterDraw(_id);
		}
	});
	return <></>;
};
