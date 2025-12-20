import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuthMiddleware } from "@/lib/middlewares";

export const Route = createFileRoute("/")({
	server: {
		middleware: [requireAuthMiddleware],
	},
	loader: async () => {
		const { data } = await authClient.getSession();
		return data;
	},
	component: App,
});

function App() {
	const session = Route.useLoaderData();
	const navigate = Route.useNavigate();

	return (
		<div>
			{session && (
				<Button
					onClick={async () => {
						await authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									navigate({
										to: "/login",
									});
								},
							},
						});
					}}
				>
					Signout
				</Button>
			)}
			{JSON.stringify(session, null, 2)}
		</div>
	);
}
