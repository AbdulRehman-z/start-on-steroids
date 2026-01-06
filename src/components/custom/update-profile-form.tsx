import { useForm } from "@tanstack/react-form";
import { AlertCircle, Loader2, Upload, X } from "lucide-react";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateProfile } from "@/hooks/use-update-profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
	onSuccess: () => void;
};

const usernameSchema = z.object({
	username: z
		.string()
		.refine((val) => val === "" || (val.length >= 2 && val.length <= 100), {
			message: "Username must be between 2 and 100 characters",
		}),
	imageFile: z.any().nullable(),
});

// Accepted image types for the file input
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif",
];

export const UpdateProfileForm = ({ onSuccess }: Props) => {
	const {
		imagePreview,
		pendingImageUrl,
		handleFileSelect,
		removeImage,
		updateProfile,
		isUploading,
		isUpdating,
		isLoading,
	} = useUpdateProfile({ onSuccess });

	const form = useForm({
		defaultValues: {
			username: "",
			imageFile: null as File | null,
		},
		validators: {
			onSubmit: usernameSchema,
		},
		onSubmit: ({ value }) => {
			updateProfile(value.username);
		},
	});

	return (
		<Card>
			<CardContent className="pt-6">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting,
							isPristine: state.isPristine,
							values: state.values,
						})}
					>
						{({ canSubmit, isSubmitting, values }) => {
							// Calculate if form has actual changes (not just default empty values)
							const hasUsernameChange = values.username.trim() !== "";
							const hasImageChange = pendingImageUrl !== null;
							const hasAnyChanges = hasUsernameChange || hasImageChange;

							// Button should be disabled if:
							// 1. No changes made (!hasAnyChanges)
							// 2. Form is pristine (never touched) AND no image upload pending
							// 3. Loading states are active
							// 4. Cannot submit due to validation errors
							const shouldDisableSubmit =
								!hasAnyChanges || isLoading || isSubmitting || !canSubmit;

							return (
								<FieldGroup>
									{/* Image Upload Field */}
									<form.Field
										name="imageFile"
										listeners={{
											onChange: ({ value }) => {
												if (value) {
													handleFileSelect(value);
												}
											},
										}}
									>
										{(field) => (
											<Field>
												<FieldLabel>Profile Picture</FieldLabel>
												<div className="flex items-center gap-4">
													<Avatar className="h-20 w-20">
														<AvatarImage src={imagePreview || undefined} />
														<AvatarFallback>
															<Upload className="size-6 text-muted-foreground" />
														</AvatarFallback>
													</Avatar>

													<div className="flex flex-col gap-2">
														<div className="flex gap-2">
															<Button
																type="button"
																variant="outline"
																size="sm"
																disabled={isLoading}
																onClick={() =>
																	document
																		.getElementById("image-upload")
																		?.click()
																}
															>
																{isUploading ? (
																	<>
																		<Loader2 className="size-4 animate-spin mr-2" />
																		Uploading...
																	</>
																) : (
																	<>
																		<Upload className="size-4 mr-2" />
																		Upload Image
																	</>
																)}
															</Button>

															{imagePreview && (
																<Button
																	type="button"
																	variant="outline"
																	size="sm"
																	disabled={isLoading}
																	onClick={() => {
																		removeImage();
																		field.handleChange(null);
																	}}
																>
																	<X className="size-4 mr-2" />
																	Remove
																</Button>
															)}
														</div>

														<p className="text-xs text-muted-foreground">
															JPG, PNG, WEBP or GIF (max 5MB)
														</p>
													</div>

													<input
														id="image-upload"
														type="file"
														accept={ACCEPTED_IMAGE_TYPES.join(",")}
														className="hidden"
														onChange={(e) => {
															const file = e.target.files?.[0];
															if (file) {
																field.handleChange(file);
															}
														}}
														disabled={isLoading}
													/>
												</div>
											</Field>
										)}
									</form.Field>

									{/* Warning message when image is uploading */}
									{isUploading && (
										<Alert>
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>
												Please wait for the image upload to complete before
												submitting.
											</AlertDescription>
										</Alert>
									)}

									{/* Success message after image upload */}
									{!isUploading && hasImageChange && (
										<Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100">
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>
												Image uploaded successfully! Click "Update Profile" to
												save your changes.
											</AlertDescription>
										</Alert>
									)}

									{/* Username Field */}
									<form.Field
										name="username"
										children={(field) => {
											const errors = field.state.meta.errors;
											const isInvalid =
												errors.length > 0 && field.state.meta.isTouched;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>
														Username (Optional)
													</FieldLabel>
													<Input
														disabled={isLoading}
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Enter your username"
													/>
													{isInvalid && <FieldError errors={errors} />}
												</Field>
											);
										}}
									/>

									{/* Submit Button */}
									<Field>
										<Button
											disabled={shouldDisableSubmit}
											type="submit"
											className="w-full"
											onClick={(e) => {
												e.preventDefault();
												if (!shouldDisableSubmit && !isUploading) {
													form.handleSubmit();
												}
											}}
										>
											{isUpdating ? (
												<>
													<Loader2 className="size-4 animate-spin mr-2" />
													Updating...
												</>
											) : (
												"Update Profile"
											)}
										</Button>
									</Field>
								</FieldGroup>
							);
						}}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	);
};
