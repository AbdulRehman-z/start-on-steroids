import { ChangePasswordForm } from "../auth/change-password-form";
import { ResponsiveDialog } from "./responsive-dialog";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ChangePasswordDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Change Password"
			description="Change your password by entering your current password and a new password."
			open={open}
			onOpenChange={onOpenChange}
		>
			<ChangePasswordForm onSuccess={() => onOpenChange(false)} />
		</ResponsiveDialog>
	);
};
