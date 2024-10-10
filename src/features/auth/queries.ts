"use server";

import { createSessionClient } from "@/lib/appwrite";

export const protectLoggedInUserOnly = async () => {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch {
		return null;
	}
};
