import { createFileRoute } from "@tanstack/react-router";
import { DangerZone } from "@/components/danger/danger-zone";

export const Route = createFileRoute("/_protected/danger/")({
	// loader: async ({ context }) => {
	// 	const { queryClient } = context;
	// 	void queryClient.prefetchQuery({
	// 		staleTime: 1000 * 60 * 10,
	// 		queryKey: ["user-sessions"],
	// 		queryFn: getUserSessionsFn,
	// 	});
	// },
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex-1 overflow-y-auto">
			<div className="flex flex-col min-h-full p-8">
				<header className="border-b pb-8">
					<h1 className="text-destructive font-bold text-4xl uppercase tracking-tighter">
						Danger Zone
					</h1>
					<p className="mt-2 text-muted-foreground font-mono">
						Critical account operations and irreversible actions. Proceed with
						extreme caution.
					</p>
				</header>
				<div className="flex-1 py-8 flex flex-col">
					{/*<Suspense
						fallback={
							<GenericLoader
								title="Loading Sessions"
								description="Waiting for sessions to load! Hold on..."
							/>
						}
					>*/}
					<DangerZone />
					{/*</Suspense>*/}
				</div>
			</div>
		</main>
	);
}
