import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { AccountsManager } from "@/components/accounts/user-accounts-manager";
import { GenericLoader } from "@/components/custom/generic-loader";
import { getUserAccountsFn } from "@/functions/get-user-accounts-fn";

export const Route = createFileRoute("/_protected/accounts/")({
	loader: async ({ context }) => {
		void context.queryClient.prefetchQuery({
			staleTime: 1000 * 60 * 5, // means 5 minutes
			queryKey: ["user-accounts"],
			queryFn: getUserAccountsFn,
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex-1 overflow-y-auto">
			<div className="flex flex-col min-h-full p-8">
				<header className="border-b pb-8">
					<h1 className="font-bold text-4xl uppercase tracking-tighter">
						Accounts
					</h1>
					<p className="mt-2 text-muted-foreground font-mono">
						Manage your connected social accounts and third-party integrations.
					</p>
				</header>
				<div className="flex-1 py-8 flex flex-col">
					<Suspense
						fallback={
							<GenericLoader
								title="Loading Accounts"
								description="Waiting for your account details..."
							/>
						}
					>
						<AccountsManager />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
