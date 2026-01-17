import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { GenericLoader } from "@/components/custom/generic-loader";
import { SessionsContainer } from "@/components/sessions/sessions-container";
import { getUserSessionsFn } from "@/functions/get-user-sessions-fn";

export const Route = createFileRoute("/_protected/sessions/index")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		void queryClient.prefetchQuery({
			staleTime: 1000 * 60 * 10,
			queryKey: ["user-sessions"],
			queryFn: getUserSessionsFn,
		})
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex-1 overflow-y-auto">
			<div className="flex flex-col min-h-full p-8">
				<header className="border-b pb-8">
					<h1 className="font-bold text-4xl uppercase tracking-tighter">
						Sessions
					</h1>
					<p className="mt-2 text-muted-foreground font-mono">
						Manage your sessions across all devices from one centralized place.
					</p>
				</header>
				<div className="flex-1 py-8 flex flex-col">
					<Suspense
						fallback={
							<GenericLoader
								title="Loading Sessions"
								description="Waiting for sessions to load! Hold on..."
							/>
						}
					>
						<SessionsContainer />
					</Suspense>
				</div>
			</div>
		</main>
	)
}
