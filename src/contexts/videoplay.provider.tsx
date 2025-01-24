import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { VideoPlayContext } from "./videoplay.context";
import { VideoPlayer } from "../components/karaoke/VideoPlayer";
import { AudioPlayer } from "../components/karaoke/AudioPlayer";

export const PlaybackContext = ({
	children,
	src,
	audioSrc,
}: {
	children: ReactNode;
	src: string;
	audioSrc?: string;
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);
	const raf = useRef<number>(0);
	const [time, setTime] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleTimeUpdate = useCallback(() => {
		if (videoRef.current && !videoRef.current.paused) {
			setTime(videoRef.current.currentTime);
		}
		raf.current = requestAnimationFrame(handleTimeUpdate);
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			handleTimeUpdate();
			return () => {
				if (raf.current) {
					cancelAnimationFrame(raf.current);
				}
			};
		}
	}, [handleTimeUpdate]);

	const play = () => {
		setIsPlaying(true);
		videoRef.current?.play();
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	return (
		<VideoPlayContext.Provider value={{ playbackTime: time }}>
			<VideoPlayer ref={videoRef} src={src} />
			{audioSrc && <AudioPlayer ref={audioRef} src={audioSrc} />}
			{!isPlaying && (
				<button
					onClick={() => play()}
					className="rounded-full w-[96px] h-[96px] bg-pink-600 text-white z-20 absolute left-[50%] -ml-[48px] top-[50%] -mt-[48px]"
				>
					Play
				</button>
			)}
			{children}
		</VideoPlayContext.Provider>
	);
};
