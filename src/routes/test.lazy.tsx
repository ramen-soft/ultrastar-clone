import { createLazyFileRoute } from "@tanstack/react-router";
import { FFT } from "../components/FFT";

export const Route = createLazyFileRoute("/test")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<FFT />
		</>
	);
}
