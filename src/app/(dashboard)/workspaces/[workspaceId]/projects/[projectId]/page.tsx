import { redirect } from "next/navigation";

import { ProjectIdClient } from "./client";
import { protectLoggedInUserOnly } from "@/features/auth/queries";

const ProjectIdPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return <ProjectIdClient />;
};

export default ProjectIdPage;
