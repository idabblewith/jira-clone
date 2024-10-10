import { protectLoggedInUserOnly } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}
	return (
		<div>
			<p>Only visible to authorized users</p>
		</div>
	);
}
