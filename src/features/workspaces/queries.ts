"use server";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkspaces = async () => {
	const { account, databases } = await createSessionClient();

	const user = await account.get();

	// Get the list of workspaces that the user is a member of
	const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
		Query.equal("userId", user.$id),
	]);

	// If the user is not a member of any workspace, return an empty array
	if (members.total === 0) {
		return { documents: [], total: 0 };
	}

	// Otherwise, get the list of workspaces Ids that the user is a member of
	const workspaceIds = members.documents.map((member) => member.workspaceId);

	//
	const workspaces = await databases.listDocuments(
		DATABASE_ID,
		WORKSPACES_ID,
		[Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
	);

	return workspaces;
};

interface IGetWorkspaceProps {
	workspaceId: string;
}

export const getWorkspace = async ({ workspaceId }: IGetWorkspaceProps) => {
	const { account, databases } = await createSessionClient();

	const user = await account.get();

	const member = await getMember({
		databases,
		userId: user.$id,
		workspaceId,
	});

	if (!member) {
		throw new Error("You are not a member of this workspace");
	}

	const workspace = await databases.getDocument<Workspace>(
		DATABASE_ID,
		WORKSPACES_ID,
		workspaceId
	);

	return workspace;
};
