"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { data, isLoading } = useCurrentUser();
	const router = useRouter();
	const { mutate: logout } = useLogout();

	useEffect(() => {
		if (!data && !isLoading) {
			router.push("/sign-in");
		}
	}, [data]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (data) {
		return (
			<div>
				<p>Only visible to authorized users</p>
				<Button onClick={logout}>Logout</Button>
			</div>
		);
	}
}
