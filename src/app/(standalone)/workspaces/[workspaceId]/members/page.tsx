import { redirect } from "next/navigation";

import { MembersList } from "@/features/workspaces/components/members-list";
import { protectLoggedInUserOnly } from "@/features/auth/queries";

const WorkspaceIdMembersPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return (
		<div className="w-full lg:max-w-xl">
			<MembersList />
		</div>
	);
};

export default WorkspaceIdMembersPage;
