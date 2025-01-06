import { redirect } from "next/navigation";

import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { protectLoggedInUserOnly } from "@/features/auth/queries";

const TasksPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	return (
		<div className="h-full flex flex-col">
			<TaskViewSwitcher />
		</div>
	);
};

export default TasksPage;
