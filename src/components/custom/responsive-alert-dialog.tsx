import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../ui/alert-dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer";

type ResponsiveDialogProps = {
	title: string;
	description: string;
	children: ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const ResponsiveDialog = ({
	description,
	title,
	children,
	open,
	onOpenChange,
}: ResponsiveDialogProps) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={onOpenChange}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{description}</DrawerDescription>
					</DrawerHeader>
					<div className="p-4">{children}</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="uppercase tracking-tighter text-2xl font-black italic">
						Final Warning
					</AlertDialogTitle>
					<AlertDialogDescription className="text-foreground text-sm uppercase leading-tight tracking-tight pt-2">
						Are you absolutely sure? This will permanently delete your account
						and all associated data. This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
};
