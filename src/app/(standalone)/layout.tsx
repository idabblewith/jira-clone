import { Navitar } from "@/features/auth/components/navitar";
import Image from "next/image";
import Link from "next/link";

const StandaloneLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex justify-between items-center h-[73px]">
					<Link href="/">
						<Image
							src="/logo.svg"
							height={50}
							width={50}
							alt="logo"
						/>
					</Link>
					<Navitar />
				</nav>
				<div className="flex flex-col items-center justify-center py-4">
					{children}
				</div>
			</div>
		</main>
	);
};
export default StandaloneLayout;
