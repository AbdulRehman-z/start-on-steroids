import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Props = {
	disabled: boolean;
	lastLoginMethod?: ReturnType<typeof authClient.getLastUsedLoginMethod>;
};

export const UsePassKeyButton = ({ disabled, lastLoginMethod }: Props) => {
	const navigate = useNavigate();
	useEffect(() => {
		// this check prevent unnecessary request for passkey if the user browser does not support conditional UI. Read more: https://www.better-auth.com/docs/plugins/passkey#conditional-ui

		if (
			!PublicKeyCredential.isConditionalMediationAvailable ||
			!PublicKeyCredential.isConditionalMediationAvailable()
		) {
			return;
		}

		void authClient.signIn.passkey(
			{
				autoFill: false,
			},
			{
				onSuccess: () => {
					toast.success("Passkey authentication successful");
					navigate({
						to: "/profile",
					});
				},
				onError: (context) => {
					toast.error(
						context.error.message || "Failed to authenticate with passkey",
					);
				},
			},
		);
	}, [navigate]);

	const handlePassKeyClick = async () => {
		await authClient.signIn.passkey(undefined, {
			onSuccess: () => {
				toast.success("Passkey authentication successful");
				navigate({
					to: "/profile",
				});
			},
			onError: (context) => {
				toast.error(
					context.error.message || "Failed to authenticate with passkey",
				);
			},
		});
	};

	return (
		<Button
			type="button"
			disabled={disabled}
			className="w-full relative"
			onClick={handlePassKeyClick}
		>
			Use Passkey
			{lastLoginMethod === "passkey" && (
				<Badge
					variant="secondary"
					className="absolute -right-0.5 top-2/12 -translate-y-1/2 text-[10px]"
				>
					Last Used
				</Badge>
			)}
		</Button>
	);
};
