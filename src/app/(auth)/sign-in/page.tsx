import { SignInCard } from "@/features/auth/components/sign-in-card";
import { protectLoggedInUserOnly } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const SignInPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();
	if (loggedIn) {
		redirect("/");
	}
	return <SignInCard />;
};
export default SignInPage;
