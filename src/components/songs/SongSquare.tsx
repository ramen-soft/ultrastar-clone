import { COVERS_URL } from "../../consts";
import { ISong } from "../../dto/ISong";
import { SongSquareDownloadButton } from "./SongSquareDownloadButton";

export const SongSquare = ({
	songInfo,
	onClick,
}: {
	songInfo: ISong;
	onClick: (song: ISong) => void;
}) => {
	return (
		<div
			key={songInfo.id}
			className="song shadow-md rounded-md hover:shadow-lg p-2 relative flex flex-col mb-4"
			onClick={() => onClick(songInfo)}
		>
			<div
				className={`cover relative self-center flex items-center justify-center`}
			>
				<img
					className={songInfo.downloaded ? "" : "opacity-50"}
					width={150}
					height={150}
					src={`${COVERS_URL}/${songInfo.id}.jpg`}
				/>
				{!songInfo.downloaded && (
					<SongSquareDownloadButton className="absolute" />
				)}
			</div>
			<summary className="flex flex-col px-4">
				<strong>{songInfo.name}</strong>
				<em className="text-sm">{songInfo.artist}</em>
			</summary>
		</div>
	);
};
