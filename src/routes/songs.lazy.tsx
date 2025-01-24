import { createLazyFileRoute } from "@tanstack/react-router";
import { SongsPage } from "../pages/SongsPage";

export const Route = createLazyFileRoute("/songs")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="p-4">
			<h1 className="text-4xl mb-4">Listado de canciones</h1>
			<SongsPage />
		</main>
	);
}
