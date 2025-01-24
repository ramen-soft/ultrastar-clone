import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEvent, useEffect, useState } from "react";

export const SongSearchBar = ({
	onSearch,
	className = "",
}: {
	onSearch: (term?: string) => void;
	className?: string;
}) => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearch]);

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = evt;
		setSearchTerm(value);
	};
	return (
		<div
			className={`rounded-md border border-slate-400 py-1 px-2 ${className}`}
		>
			<input
				type="text"
				className="w-full outline-none"
				onChange={handleInputChange}
			/>
		</div>
	);
};
