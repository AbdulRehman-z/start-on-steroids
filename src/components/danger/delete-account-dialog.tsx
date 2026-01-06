import { ResponsiveDialog } from "../custom/responsive-dialog";
import { ConfirmDelete } from "./confirm-delete";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const DeleteAccountDialog = ({ open, onOpenChange }: Props) => {
	return (
		<ResponsiveDialog
			title="Delete Account"
			description="Delete your account"
			open={open}
			onOpenChange={onOpenChange}
		>
			<ConfirmDelete />
		</ResponsiveDialog>
	);
};
