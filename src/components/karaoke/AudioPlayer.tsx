import React, { forwardRef, Ref } from "react";

interface AudioPlayerProps {
	src: string;
}

export const AudioPlayer = React.memo(
	forwardRef(({ src }: AudioPlayerProps, ref: Ref<HTMLAudioElement>) => {
		return <audio preload="auto" src={src} ref={ref} />;
	})
);
