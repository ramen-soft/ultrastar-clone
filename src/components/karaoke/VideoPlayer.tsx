import React, { forwardRef, Ref } from "react";

interface VideoPlayerProps {
	src: string;
}

export const VideoPlayer = React.memo(
	forwardRef(({ src }: VideoPlayerProps, ref: Ref<HTMLVideoElement>) => {
		return (
			<>
				<video
					playsInline
					className="absolute w-full h-full bg-black z-10"
					preload="auto"
					src={src}
					ref={ref}
				/>
			</>
		);
	})
);
