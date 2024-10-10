import "server-only";

import {
	Account,
	Client,
	Databases,
	Models,
	Storage,
	type Account as AccountType,
	type Databases as DatabasesType,
	type Storage as StorageType,
	type Users as UsersType,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

type AdditionalContext = {
	Variables: {
		account: AccountType;
		databases: DatabasesType;
		storage: StorageType;
		users: UsersType;
		user: Models.User<Models.Preferences>;
	};
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
	async (c, next) => {
		// Create a new Appwrite client
		const client = new Client()
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

		// Get the session cookie (from login or register)
		const session = getCookie(c, AUTH_COOKIE);

		// If there is no session cookie, return an error
		if (!session) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		// Set the session cookie in the client
		client.setSession(session);

		// Create the Account, Databases, and Storage instances
		const account = new Account(client);
		const databases = new Databases(client);
		const storage = new Storage(client);

		// Get the user from the account (currently logged in)
		const user = await account.get();

		// Set the context variables (append so they can be accessed elsewhere)
		c.set("account", account);
		c.set("databases", databases);
		c.set("storage", storage);
		c.set("user", user);

		// Continue to the next middleware
		await next();
	}
);
