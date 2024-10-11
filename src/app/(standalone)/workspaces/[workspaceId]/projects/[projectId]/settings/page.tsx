import { redirect } from "next/navigation";

import { ProjectIdSettingsClient } from "./client";
import { protectLoggedInUserOnly } from "@/features/auth/queries";

const ProjectIdSettingsPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return <ProjectIdSettingsClient />;
};

export default ProjectIdSettingsPage;
