import { useQuery } from "@tanstack/react-query";
import { getUserDetailsFn } from "@/functions/get-user-details-fn";

export const useGetUserDetails = () => {
	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ["user-details"],
		queryFn: () => getUserDetailsFn(),
	});

	return { data, isPending, error, refetch, isError };
};
