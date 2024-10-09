"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IAuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayout = ({ children }: IAuthLayoutProps) => {
	const pathname = usePathname();
	const isSignIn = pathname === "/sign-in";

	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex justify-between items-center">
					<Image
						src={"/logo.svg"}
						height={50}
						width={50}
						alt="logo"
					/>
					<Button variant={"secondary"} asChild>
						<Link href={isSignIn ? "/sign-up" : "/sign-in"}>
							{isSignIn ? "Sign Up" : "Sign In"}
						</Link>
					</Button>
				</nav>
				<div className="flex flex-col items-center justify-center pt-4 md:pt-14">
					{children}
				</div>
			</div>
		</main>
	);
};
export default AuthLayout;
