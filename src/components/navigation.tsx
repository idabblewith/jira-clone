"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
	GoCheckCircle,
	GoCheckCircleFill,
	GoHome,
	GoHomeFill,
} from "react-icons/go";

import { cn } from "@/lib/utils";

const routes = [
	{
		label: "Home",
		href: "",
		icon: GoHome,
		activeIcon: GoHomeFill,
	},
	{
		label: "My Tasks",
		href: "/tasks",
		icon: GoCheckCircle,
		activeIcon: GoCheckCircleFill,
	},
	{
		label: "Members",
		href: "/members",
		icon: UsersIcon,
		activeIcon: UsersIcon,
	},
	{
		label: "Settings",
		href: "/settings",
		icon: SettingsIcon,
		activeIcon: SettingsIcon,
	},
];

export const Navigation = () => {
	const pathname = usePathname();

	return (
		<ul className="flex flex-col">
			{routes.map((item) => {
				const isActive = pathname === item.href;
				const Icon = isActive ? item.activeIcon : item.icon;

				return (
					<Link key={item.href} href={item.href}>
						<div
							className={cn(
								"flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
								isActive &&
									"bg-white shadow-sm hover:opacity-100 text-primary"
							)}
						>
							<Icon className="size-5 text-neutral-500" />
							{item.label}
						</div>
					</Link>
				);
			})}
		</ul>
	);
};
