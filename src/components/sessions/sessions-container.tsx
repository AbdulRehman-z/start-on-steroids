import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { HistoryIcon, ShieldXIcon } from "lucide-react";
import { toast } from "sonner";
import { getUserSessionsFn } from "@/functions/get-user-sessions-fn";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { SessionItem } from "./session-item";

export const SessionsContainer = () => {
	const { data } = useSuspenseQuery({
		queryKey: ["user-sessions"],
		queryFn: getUserSessionsFn,
		staleTime: 1000 * 60 * 10,
	});
	const queryClient = useQueryClient();

	const handleRevokeOtherSessions = async () => {
		await authClient.revokeOtherSessions({
			fetchOptions: {
				onSuccess: () => {
					toast.success("Other sessions revoked successfully");
					queryClient.invalidateQueries({ queryKey: ["user-sessions"] });
				},
				onError: ({ error }) => {
					console.error(error);
					toast.error("Failed to revoke other sessions");
				},
			},
		});
	};

	const currentSession = data.sessions.find(
		(s) => s.token === data.currentSessionToken,
	);
	const otherSessions = data.sessions.filter(
		(s) => s.token !== data.currentSessionToken,
	);

	return (
		<div className="max-w-4xl space-y-12 py-10">
			<section className="space-y-4">
				<div className="flex items-center justify-between border-b pb-4">
					<div className="space-y-1">
						<h2 className="flex items-center gap-2 font-bold text-xl uppercase tracking-tighter">
							<ShieldXIcon className="size-5" />
							Current Session
						</h2>
						<p className="text-sm text-muted-foreground font-mono">
							The device you are currently using to access Flowcat Inc.
						</p>
					</div>
				</div>
				{currentSession && (
					<SessionItem
						currentSessionToken={currentSession.token}
						session={currentSession}
						isCurrent={true}
					/>
				)}
			</section>

			<section className="space-y-4">
				<div className="flex items-center justify-between border-b pb-4">
					<div className="space-y-1">
						<h2 className="flex items-center gap-2 font-bold text-xl uppercase tracking-tighter">
							<HistoryIcon className="size-5" />
							Other Sessions
						</h2>
						<p className="text-sm text-muted-foreground font-mono">
							Devices that have logged into your account previously.
						</p>
					</div>
					<Button
						disabled={otherSessions.length === 0}
						onClick={handleRevokeOtherSessions}
						variant="destructive"
						className="uppercase font-bold"
						size="lg"
					>
						Revoke All Others
					</Button>
				</div>
				<div className="grid gap-2">
					{otherSessions.length > 0 ? (
						otherSessions.map((session) => (
							<SessionItem
								key={session.id}
								session={session}
								isCurrent={false}
							/>
						))
					) : (
						<div className="border border-dashed p-8 text-center text-muted-foreground font-mono text-sm">
							No other active sessions found.
						</div>
					)}
				</div>
			</section>
		</div>
	);
};
