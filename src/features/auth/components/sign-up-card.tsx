"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

export const SignUpCard = () => {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useRegister();

	const onSubmit = (values: z.infer<typeof registerSchema>) => {
		// console.log(values);
		mutate({ json: values });
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription className="text-balance">
					By signing up, you agree to our{" "}
					<Link href="/privacy-policy">
						<span className="text-blue-700">Privacy Policy</span>
					</Link>{" "}
					and{" "}
					<Link href="/terms">
						<span className="text-blue-700">Terms of Service</span>
					</Link>
				</CardDescription>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				{/* Sign In Form */}
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="text"
											placeholder="Enter name"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											placeholder="Enter email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="Enter password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={false} size={"lg"} className="w-full">
							Register
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex flex-col gap-y-4">
				<Button
					onClick={() => signUpWithGoogle()}
					variant={"secondary"}
					size={"lg"}
					className="w-full"
					disabled={isPending}
				>
					<FcGoogle className="mr-2 size-5" />
					Continue with Google
				</Button>
				<Button
					onClick={() => signUpWithGithub()}
					variant={"secondary"}
					size={"lg"}
					className="w-full"
					disabled={isPending}
				>
					<FaGithub className="mr-2 size-5" />
					Continue with Github
				</Button>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex items-center justify-center">
				<p>
					Already have an account?{" "}
					<Link href="/sign-in">
						<span className="text-blue-700">Sign in</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
