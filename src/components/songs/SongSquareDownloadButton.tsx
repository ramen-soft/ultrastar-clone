import { MouseEventHandler } from "react";
import { DownloadIcon } from "../ui/icons/DownloadIcon";

export const SongSquareDownloadButton = ({
	onClick,
	className = "",
}: {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
}) => {
	return (
		<button
			onClick={onClick}
			className={`rounded-full bg-[#0009] text-white p-3 flex items-center justify-center ${className}`}
		>
			<DownloadIcon size={36} />
		</button>
	);
};
