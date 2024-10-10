import { protectLoggedInUserOnly } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
	const loggedIn = await protectLoggedInUserOnly();
	if (loggedIn) {
		redirect("/");
	}
	return <SignUpCard />;
};
export default SignUpPage;
