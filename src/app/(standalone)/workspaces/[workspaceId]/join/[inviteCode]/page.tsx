import { redirect } from "next/navigation";

import { protectLoggedInUserOnly } from "@/features/auth/queries";

import { WorkspaceIdJoinClient } from "./client";

const WorkspaceIdJoinPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
