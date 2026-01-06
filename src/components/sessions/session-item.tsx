import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Session } from "better-auth";
import {
	Clock,
	Globe,
	LaptopIcon,
	Monitor,
	MonitorOffIcon,
	Smartphone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn, formatDate } from "@/lib/utils";

type Props = {
	currentSessionToken?: string;
	session: Session;
	isCurrent: boolean;
};

export function SessionItem({
	currentSessionToken,
	session,
	isCurrent,
}: Props) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [isPending, setIsPending] = useState(false);

	const revokeSession = async () => {
		setIsPending(true);
		await authClient.revokeSession(
			{
				token: currentSessionToken || session.token,
			},
			{
				onSuccess: () => {
					setIsPending(false);
					toast.success("Session revoked successfully");
					if (isCurrent) {
						queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
						navigate({ to: "/login" });
					} else {
						queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
					}
				},
				onError: ({ error }) => {
					setIsPending(false);
					console.error("Failed to revoke session", error);
					toast.error(error.message || "Failed to revoke session");
				},
			},
		);
	};

	const parser = new UAParser(session.userAgent || "");
	const result = parser.getResult();

	const browserName = result.browser.name || "Unknown Browser";
	const osName = result.os.name || "Unknown OS";
	const deviceType = result.device.type; // 'mobile', 'tablet', 'smarttv'
	const isMobile = deviceType === "mobile" || deviceType === "tablet";

	const Icon = isMobile
		? Smartphone
		: deviceType === "wearable"
			? Monitor
			: LaptopIcon;

	return (
		<div className="flex items-start justify-between border p-4 font-mono transition-colors hover:bg-secondary/50">
			<div className="flex gap-4">
				<div className="mt-1 flex size-10 items-center justify-center border bg-background">
					<Icon className="size-5" />
				</div>
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<span className="font-bold uppercase tracking-tight">
							{browserName} on {osName}
						</span>
						{isCurrent && (
							<Badge variant="default" className="text-xs px-1">
								Current
							</Badge>
						)}
					</div>
					<div className="flex flex-wrap flex-col gap-x-4 gap-y-1 text-xs text-muted-foreground">
						<span className="flex items-center gap-1">
							<Globe className="size-3" />
							{session.ipAddress}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="size-3" />
							Created at {formatDate(session.createdAt)}
						</span>
						<span className="flex items-center gap-1">
							<MonitorOffIcon className="size-3" />
							Expires at {formatDate(session.expiresAt)}
						</span>
					</div>
				</div>
			</div>
			<Button
				onClick={revokeSession}
				disabled={isPending}
				variant="destructive"
				size="sm"
				className={cn(" uppercase font-bold")}
			>
				{isPending ? "Revoking..." : "Revoke"}
			</Button>
		</div>
	);
}
