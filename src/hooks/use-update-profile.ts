import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// Types for Cloudinary upload response
type CloudinaryUploadResponse = {
	secure_url: string;
	public_id: string;
	format: string;
	width: number;
	height: number;
};

// Image validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif",
];

type UpdateProfileParams = {
	name?: string;
	image?: string;
};

async function uploadToCloudinary(file: File): Promise<string> {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "user_profile");

	// Upload to Cloudinary
	const uploadResponse = await fetch(
		`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
		{
			method: "POST",
			body: formData,
		},
	);

	if (!uploadResponse.ok) {
		const error = await uploadResponse.json();
		throw new Error(error.error?.message || "Failed to upload image");
	}

	const data: CloudinaryUploadResponse = await uploadResponse.json();
	return data.secure_url;
}

/**
 * Validates an image file before upload
 */
function validateImageFile(file: File): { valid: boolean; error?: string } {
	if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
		return {
			valid: false,
			error: "Invalid file type. Please upload JPG, PNG, WEBP, or GIF",
		};
	}

	if (file.size > MAX_FILE_SIZE) {
		return {
			valid: false,
			error: "File too large. Maximum size is 5MB",
		};
	}

	return { valid: true };
}

/**
 * Hook for managing profile updates with Cloudinary image upload
 *
 * Provides:
 * - Image upload with validation and preview
 * - Profile update mutation (name, image, or both)
 * - Loading states for both upload and profile update
 * - Automatic session cache invalidation on success
 */
export function useUpdateProfile(options?: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);

	// Image upload mutation
	const uploadMutation = useMutation({
		mutationFn: uploadToCloudinary,
		onSuccess: (url) => {
			setPendingImageUrl(url);
			setImagePreview(url);
			toast.success("Image uploaded successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to upload image");
		},
	});

	// Profile update mutation
	const updateMutation = useMutation({
		mutationFn: async (params: UpdateProfileParams) => {
			return new Promise<void>((resolve, reject) => {
				authClient.updateUser(params, {
					onSuccess: () => resolve(),
					onError: (ctx) => reject(new Error(ctx.error.message)),
				});
			});
		},
		onSuccess: () => {
			// Invalidate session to refresh user data
			queryClient.invalidateQueries({ queryKey: ["user-details"] });
			toast.success("Profile updated successfully");
			options?.onSuccess?.();
			// Reset state after successful update
			setImagePreview(null);
			setPendingImageUrl(null);
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update profile");
		},
	});

	/**
	 * Handle file selection and upload
	 */
	const handleFileSelect = async (file: File) => {
		const validation = validateImageFile(file);
		if (!validation.valid) {
			toast.error(validation.error);
			return;
		}

		// Show local preview immediately
		const localPreview = URL.createObjectURL(file);
		setImagePreview(localPreview);

		// Upload to Cloudinary
		uploadMutation.mutate(file);
	};

	/**
	 * Remove the pending image
	 */
	const removeImage = () => {
		setImagePreview(null);
		setPendingImageUrl(null);
		uploadMutation.reset();
	};

	/**
	 * Submit profile update
	 */
	const updateProfile = (username?: string) => {
		const updateData: UpdateProfileParams = {};

		if (username?.trim()) {
			updateData.name = username.trim();
		}

		if (pendingImageUrl) {
			updateData.image = pendingImageUrl;
		}

		if (Object.keys(updateData).length === 0) {
			toast.error("Please provide at least one field to update");
			return;
		}

		updateMutation.mutate(updateData);
	};

	return {
		// State
		imagePreview,
		pendingImageUrl,

		// Actions
		handleFileSelect,
		removeImage,
		updateProfile,

		// Loading states
		isUploading: uploadMutation.isPending,
		isUpdating: updateMutation.isPending,
		isLoading: uploadMutation.isPending || updateMutation.isPending,

		// Error states
		uploadError: uploadMutation.error,
		updateError: updateMutation.error,
	};
}
