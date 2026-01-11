import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getUserPasskeysFn } from "@/functions/get-user-passkeys-fn";
import { AddPasskeyForm } from "./passkey-form";
import { PasskeyList } from "./passkey-list";

export function PasskeyManagement() {
	const {
		data: passkeys,
		isPending,
		error,
	} = useQuery({
		queryKey: ["passkeys"],
		queryFn: getUserPasskeysFn,
	});

	return (
		<div className="space-y-6">
			{/* Add New Passkey Section */}
			<div className="p-4 border rounded-lg bg-muted/30">
				<h4 className="text-sm font-semibold mb-4">Register New Passkey</h4>
				<AddPasskeyForm />
			</div>

			{/* List Section */}
			<div>
				{isPending ? (
					<div className="flex flex-col items-center justify-center py-12 space-y-4">
						<Loader2 size={32} className="animate-spin text-primary/50" />
						<p className="text-sm text-muted-foreground animate-pulse">
							Loading your passkeys...
						</p>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-10 text-destructive space-y-2">
						<p className="font-medium">Failed to load passkeys</p>
						<p className="text-sm opacity-80">{error.message}</p>
					</div>
				) : (
					<PasskeyList passkeys={passkeys || []} />
				)}
			</div>
		</div>
	);
}
