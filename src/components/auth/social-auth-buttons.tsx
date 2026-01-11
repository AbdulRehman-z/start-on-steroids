import { Image } from "@unpic/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
	PROVIDERS_CONFIG,
	type SupportedSocialProvider,
} from "@/lib/constants";
import type { AllRoutes } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

type SocialAuthButtonsProps = {
	// Whether buttons should be disabled (e.g., during form submission)
	disabled: boolean;
	// URL to redirect to after OAuth completes - handled by Better Auth server
	callbackURL?: AllRoutes;
	// Called when social auth starts - use to disable other form elements
	onAuthStart: () => void;
	lastLoginMethod?: ReturnType<typeof authClient.getLastUsedLoginMethod>;
};

export const SocialAuthButtons = ({
	disabled = false,
	callbackURL = "/profile",
	onAuthStart,
	lastLoginMethod,
}: SocialAuthButtonsProps) => {
	const [loadingProvider, setLoadingProvider] =
		useState<SupportedSocialProvider | null>(null);

	const handleSocialAuth = async (provider: SupportedSocialProvider) => {
		setLoadingProvider(provider);
		// Notify parent to disable form elements
		onAuthStart?.();
		await authClient.signIn.social(
			{
				provider,
				callbackURL,
			},
			{
				onError: (context) => {
					toast.error(
						context.error.message || "An error occurred while signing in.",
					);
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-2">
			{(Object.keys(PROVIDERS_CONFIG) as SupportedSocialProvider[]).map(
				(provider) => {
					const config = PROVIDERS_CONFIG[provider];
					const isLoading = loadingProvider === provider;
					const isDisabled = disabled || loadingProvider !== null;

					return (
						<Button
							key={provider}
							variant="outline"
							type="button"
							className="w-full relative"
							disabled={isDisabled}
							onClick={() => handleSocialAuth(provider)}
						>
							{isLoading && <Spinner className="mr-2" />}
							<Image
								src={config.icon}
								height={15}
								width={15}
								alt={`${config.label} logo`}
								className={provider === "github" ? "dark:invert" : ""}
							/>
							Continue with {config.label}
							{provider === lastLoginMethod && (
								<Badge className="absolute -right-0.5 top-2/12 -translate-y-1/2 text-[10px]">
									Last Used
								</Badge>
							)}
						</Button>
					);
				},
			)}
		</div>
	);
};
