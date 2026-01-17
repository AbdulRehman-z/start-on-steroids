import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ProfileDetailsContainer } from "@/components/auth/profile-details";
import { GenericLoader } from "@/components/custom/generic-loader";
import { getUserDetailsFn } from "@/functions/get-user-details-fn";

export const Route = createFileRoute("/_protected/profile/index")({
	loader: async ({ context }) => {
		void context.queryClient.prefetchQuery({
			staleTime: 1000 * 60 * 5, // means 5 minutes
			queryKey: ["user-details"],
			queryFn: getUserDetailsFn,
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
						Profile
					</h1>
					<p className="mt-2 text-muted-foreground font-mono">
						Manage your profile information and account settings
					</p>
				</header>
				<div className="flex-1 py-8 flex flex-col">
					<Suspense
						fallback={
							<GenericLoader
								title="Loading Profile"
								description="Waiting for your profile details..."
							/>
						}
					>
						<ProfileDetailsContainer />
					</Suspense>
				</div>
			</div>
		</main>
	)
}
