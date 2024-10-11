import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

const DashbaordLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen">
			<CreateWorkspaceModal />
			<CreateProjectModal />
			<div className="flex w-full w-height">
				{/* Sidebar Wrapper */}
				<div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
					<Sidebar />
				</div>
				<div className="lg:pl-[264px] w-full">
					{/* Content Wrapper to control how far they can expand */}
					<div className="mx-auto max-w-screen-2xl h-full">
						<Navbar />
						<main className="h-full py-8 px-6 flex flex-col">
							{children}
						</main>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashbaordLayout;
