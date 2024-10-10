import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";

// Immediate chaining of the Hono instance for RPC-style routing
const app = new Hono()
	.post("/login", zValidator("json", loginSchema), async (c) => {
		const { email, password } = c.req.valid("json");
		const { account } = await createAdminClient();

		const session = await account.createEmailPasswordSession(
			email,
			password
		);

		setCookie(c, AUTH_COOKIE, session.secret, {
			path: "/", // Cookie path
			httpOnly: true, // HTTP only cookie
			secure: true, // Secure cookie
			sameSite: "strict", // Same-site cookie
			maxAge: 60 * 60 * 24 * 30, // 30 days
		});

		return c.json({ success: "ok" });
	})
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const { email, password } = c.req.valid("json");

		const { account } = await createAdminClient();
		await account.create(ID.unique(), email, password, name);

		const session = await account.createEmailPasswordSession(
			email,
			password
		);

		setCookie(
			c, // Context
			AUTH_COOKIE, // Cookie name
			session.secret, // Cookie value
			{
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 60 * 60 * 24 * 30,
			}
		);

		return c.json({ success: true });
	})
	.post("/logout", async (c) => {
		// const account = c.get("account");

		deleteCookie(c, AUTH_COOKIE);
		// await account.deleteSession("current");

		return c.json({ success: true });
	});

export default app;
