import { protectLoggedInUserOnly } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface IWorkspaceIdSettingsProps {
	params: {
		workspaceId: string;
	};
}

const WorkspaceIdSettings = async ({ params }: IWorkspaceIdSettingsProps) => {
	const loggedIn = await protectLoggedInUserOnly();

	if (!loggedIn) {
		redirect("/sign-in");
	}

	const initialValues = await getWorkspace({
		workspaceId: params.workspaceId,
	});
	if (!initialValues) {
		redirect(`/workspaces/${params.workspaceId}`);
	}

	return (
		<div className="w-full lg:max-w-xl">
			<EditWorkspaceForm initialValues={initialValues} />
		</div>
	);
};
export default WorkspaceIdSettings;
