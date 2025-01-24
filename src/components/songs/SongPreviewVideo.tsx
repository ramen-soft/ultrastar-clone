import { useEffect, useRef } from "react";

export const SongPreviewVideo = ({
	src,
	audioSrc,
	poster,
}: {
	src?: string;
	audioSrc?: string;
	poster?: string;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current != null) {
			const el = containerRef.current;
			const video = el.querySelector("video")!;
			const audio = el.querySelector("audio")!;

			const vs = video.querySelector("source");
			const as = audio.querySelector("source");
			console.log(vs, as, src, audioSrc);

			const onTimeUpdate = () => {
				if (Math.abs(video.currentTime - audio.currentTime) > 1) {
					audio.currentTime = video.currentTime;
				}
				if (audio.paused) {
					audio.play();
				}
			};

			video.addEventListener("timeupdate", onTimeUpdate);

			if (src) {
				if (audioSrc) {
					audio.src = audioSrc;
				}
				video.src = src;
				video.play();
			}

			video.addEventListener("", () => {
				console.log("loaded");
				video.play();
			});

			return () => {
				video.pause();
				audio.pause();
				//video.removeEventListener("timeupdate", onTimeUpdate);
			};
		}
	});
	return (
		<>
			<div ref={containerRef}>
				<video preload="auto" playsInline poster={poster}>
					<source></source>
				</video>
				<audio preload="auto">
					<source></source>
				</audio>
			</div>
		</>
	);
};
