import { createFileRoute, redirect } from "@tanstack/react-router";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/_protected/")({
	server: {
		middleware: [requireAuthMiddleware],
	},
	loader: async () => {
		throw redirect({
			to: "/profile",
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	return null;
}
