import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async () => {
			const response = await client.api.auth.logout["$post"]();

			if (!response.ok) {
				throw new Error("Failed to logout");
			}

			return await response.json();
		},
		onSuccess: () => {
			toast.success("Logged out");
			router.refresh();
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
		},
		onError: (error) => {
			toast.error(`Failed to logout: ${error.message}`);
		},
	});
	return mutation;
};
