import { createFileRoute } from "@tanstack/react-router";
import { Karaoke } from "../../components/karaoke/Karaoke";

export const Route = createFileRoute("/sing/$songId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { songId } = Route.useParams();
	return <Karaoke songId={songId} />;
}
