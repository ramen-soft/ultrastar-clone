import { useContext } from "react";
import { VideoPlayContext } from "../../contexts/videoplay.context";

export const VideoTimer = () => {
	const { playbackTime } = useContext(VideoPlayContext);
	return <div>Time: {playbackTime}</div>;
};
