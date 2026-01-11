import type { Passkey } from "@better-auth/passkey";
import {
	ClockIcon,
	CloudIcon,
	CloudOffIcon,
	FingerprintIcon,
	LaptopIcon,
	ShieldCheckIcon,
	SmartphoneIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { DeletePasskeyButton } from "./delete-passkey-button";
import { UpdatePasskeyDialog } from "./update-passkey-dialog";

type PasskeyListProps = {
	passkeys: Passkey[];
	onDelete?: () => void;
	onUpdate?: () => void;
};

export function PasskeyList({ passkeys }: PasskeyListProps) {
	if (passkeys.length === 0) {
		return (
			<Card className="border-dashed shadow-sm bg-muted/30">
				<CardContent className="flex flex-col items-center justify-center py-10 text-center">
					<div className="bg-background p-3 rounded-full mb-3 shadow-sm">
						<FingerprintIcon className="size-6 text-muted-foreground" />
					</div>
					<h4 className="font-semibold text-foreground mb-1">
						No passkeys found
					</h4>
					<p className="text-sm text-muted-foreground max-w-xs mx-auto">
						Add a passkey to sign in securely without typing a password.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-3">
			{passkeys.map((passkey) => (
				<Card
					key={passkey.id}
					className="overflow-hidden transition-all hover:shadow-sm border-muted-foreground/20"
				>
					<CardHeader className="pb-3 bg-muted/10 border-b border-border/50">
						<div className="flex items-start justify-between gap-3">
							<div className="flex items-center gap-3">
								<div className="bg-primary/10 p-2 rounded-md text-primary">
									{passkey.deviceType === "singleDevice" ? (
										<SmartphoneIcon size={18} />
									) : (
										<div className="grid grid-cols-2">
											<LaptopIcon size={17} />
											<SmartphoneIcon size={17} />
										</div>
									)}
								</div>
								<div>
									<CardTitle className="text-sm font-medium leading-none">
										{passkey.name || "Unnamed Passkey"}
									</CardTitle>
									<CardDescription className="text-xs mt-1.5 flex items-center gap-1.5">
										<ClockIcon size={10} />
										Added {formatDate(passkey.createdAt)}
									</CardDescription>
								</div>
							</div>
							<div className="flex gap-1 -mr-2 -mt-1">
								<UpdatePasskeyDialog
									passkey={{ id: passkey.id, name: passkey.name }}
								/>
								<DeletePasskeyButton passkeyId={passkey.id} />
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-3 pb-3">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-full">
								<ShieldCheckIcon size={12} />
								<span>
									{passkey.deviceType === "singleDevice"
										? "This Device Only"
										: "Multi-Device / Cloud"}
								</span>
							</div>
							<div
								className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${passkey.backedUp ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"}`}
							>
								{passkey.backedUp ? (
									<CloudIcon size={12} />
								) : (
									<CloudOffIcon size={12} />
								)}
								<span>{passkey.backedUp ? "Backed Up" : "Local Only"}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
