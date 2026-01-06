import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ProfilePageSkeleton = () => {
	return (
		<div className="md:w-5xl mx-auto space-y-6">
			{/* Header Card Skeleton */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
						{/* Avatar Skeleton */}
						<Skeleton className="size-24 rounded-full shrink-0" />

						<div className="flex-1 space-y-3 w-full">
							{/* Name and Email Skeleton */}
							<div className="space-y-2">
								<Skeleton className="h-8 w-48" />
								<Skeleton className="h-5 w-64" />
							</div>

							{/* Buttons Skeleton */}
							<div className="flex flex-wrap gap-2">
								<Skeleton className="h-10 w-32" />
								<Skeleton className="h-10 w-36" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Account Information Card Skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-40 mb-2" />
					<Skeleton className="h-4 w-64" />
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 sm:grid-cols-2">
						{/* Email Address Skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<div className="flex items-center gap-2">
								<Skeleton className="h-5 w-48" />
								<Skeleton className="h-5 w-16 rounded-full" />
							</div>
						</div>

						{/* Username Skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-5 w-40" />
						</div>

						{/* Created At Skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-36" />
							<Skeleton className="h-5 w-56" />
						</div>

						{/* Last Updated Skeleton */}
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-5 w-56" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
