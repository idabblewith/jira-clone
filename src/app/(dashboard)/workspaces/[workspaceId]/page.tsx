import { protectLoggedInUserOnly } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const WorkSpaceIdPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}
	return <div>WorkSpaceIdPage</div>;
};
export default WorkSpaceIdPage;
