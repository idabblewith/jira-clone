import { protectLoggedInUserOnly } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}
	return (
		<div className="bg-muted">
			<CreateWorkspaceForm />
		</div>
	);
}
