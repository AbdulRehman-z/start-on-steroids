import { ChangeEmailForm } from "../auth/change-email-form";
import { ResponsiveDialog } from "./responsive-dialog";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ChangeEmailDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Change Email"
			description="Change your email address"
			open={open}
			onOpenChange={onOpenChange}
		>
			<ChangeEmailForm onSuccess={() => onOpenChange(false)} />
		</ResponsiveDialog>
	);
};
