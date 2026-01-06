import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";
import { CheckCircle2, Link2, Loader2, Unlink } from "lucide-react";
import { useState } from "react";
import { getUserAccountsFn } from "@/functions/get-user-accounts-fn";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
	PROVIDERS_CONFIG,
	type SupportedSocialProvider,
} from "../auth/social-auth-buttons";
import { Button } from "../ui/button";

export function AccountsManager() {
	const queryClient = useQueryClient();
	const [processingProvider, setProcessingProvider] = useState<string | null>(
		null,
	);

	const { data } = useSuspenseQuery({
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryKey: ["user-accounts"],
		queryFn: getUserAccountsFn,
	});

	const linkedAccounts = data.nonCredentialAccounts;
	const isLinked = (providerId: SupportedSocialProvider) => {
		return linkedAccounts.some((acc) => acc.providerId === providerId);
	};

	const getAccountId = (providerId: string) =>
		linkedAccounts.find((acc) => acc.providerId === providerId)?.accountId;

	const handleToggleLink = async (providerId: SupportedSocialProvider) => {
		const isLinking = !isLinked(providerId);
		setProcessingProvider(providerId);

		try {
			if (!isLinking) {
				const accountId = getAccountId(providerId);
				if (!accountId) {
					setProcessingProvider(null);
					return;
				}

				await authClient.unlinkAccount({
					providerId,
					accountId,
				});

				// Invalidate cache to refresh the list
				await queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
				setProcessingProvider(null);
			} else {
				// Link the account by initiating a social sign-in flow
				// Better-Auth links accounts automatically if a session exists
				await authClient.linkSocial({
					provider: providerId,
					callbackURL: "/accounts",
				});
				await queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
			}
		} catch (error) {
			console.error(`Failed to handle ${providerId} connection:`, error);
			setProcessingProvider(null);
		}
	};

	return (
		<div className="max-w-4xl space-y-12 py-10">
			<section className="space-y-4">
				<div className="flex items-center justify-between border-b pb-4">
					<div className="space-y-1">
						<h2 className="flex items-center gap-2 font-bold text-xl uppercase tracking-tighter">
							<Link2 className="size-5" />
							Social Connections
						</h2>
						<p className="text-sm text-muted-foreground">
							Link your social accounts to enable one-click login.
						</p>
					</div>
				</div>

				<div className="grid gap-4">
					{(["google", "github"] as SupportedSocialProvider[]).map(
						(providerId) => {
							const config = PROVIDERS_CONFIG[providerId];
							const linked = isLinked(providerId);
							const isProcessing = processingProvider === providerId;

							return (
								<div
									key={providerId}
									className={cn(
										"flex items-center justify-between border p-6 transition-all",
									)}
								>
									<div className="flex items-center gap-6">
										<div className="flex h-12 w-12 items-center justify-center border">
											<Image
												height={24}
												width={24}
												src={config.icon}
												alt={config.label}
												className={providerId === "github" ? "dark:invert" : ""}
											/>
										</div>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<h3 className="font-bold text-lg uppercase tracking-tighter">
													{config.label}
												</h3>
												{linked && (
													<CheckCircle2 className="size-4 text-foreground" />
												)}
											</div>
											<p className="max-w-md text-sm text-muted-foreground leading-tight">
												{config.description}
											</p>
										</div>
									</div>

									<Button
										variant={linked ? "destructive" : "outline"}
										onClick={() => handleToggleLink(providerId)}
										disabled={isProcessing}
										className={cn()}
									>
										{isProcessing ? (
											<Loader2 className="h-3 w-3 animate-spin" />
										) : linked ? (
											<>
												<Unlink className="mr-2 h-3 w-3" />
												Unlink
											</>
										) : (
											<>
												<Link2 className="mr-2 h-3 w-3" />
												Link Account
											</>
										)}
									</Button>
								</div>
							);
						},
					)}
				</div>
			</section>

			<section className="space-y-4">
				<div className="border border-dashed p-8 text-center bg-muted/5">
					<p className="text-muted-foreground text-sm italic">
						More providers like Discord and Twitter coming soon to Flowcat Inc.
					</p>
				</div>
			</section>
		</div>
	);
}
