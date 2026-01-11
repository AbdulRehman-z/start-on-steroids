import { PasskeyManagement } from "./passkey-management";
import { ResponsiveSheet } from "./responsive-sheet";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const PasskeySheet = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveSheet
			title="Manage Passkeys"
			description="Manage your passkeys by adding, removing, or changing them."
			open={open}
			onOpenChange={onOpenChange}
		>
			<PasskeyManagement />
		</ResponsiveSheet>
	);
};
