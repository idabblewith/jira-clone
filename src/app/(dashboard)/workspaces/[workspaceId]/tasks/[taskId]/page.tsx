import { redirect } from "next/navigation";

import { TaskIdClient } from "./client";
import { protectLoggedInUserOnly } from "@/features/auth/queries";

const TaskIdPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return <TaskIdClient />;
};

export default TaskIdPage;
