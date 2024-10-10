import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";

// Immediate chaining of the Hono instance for RPC-style routing
const app = new Hono()
	.post("/login", zValidator("json", loginSchema), (c) => {
		const { email, password } = c.req.valid("json");
		console.log(email, password);
		return c.json({ success: "ok" });
	})
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const { email, password } = c.req.valid("json");
		console.log(email, password);
		return c.json({ success: "ok" });
	});

export default app;
