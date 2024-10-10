import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/workspaces", workspaces);

// app.get("/hello", (c) => {
// 	return c.json({ message: "Hello, World!" });
// });

// app.get("/project/:id", (c) => {
// 	const { id } = c.req.param();
// 	return c.json({ message: `Project ID: ${id}` });
// });

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
