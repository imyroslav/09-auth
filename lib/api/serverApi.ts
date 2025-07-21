import type { Note, GetNotes } from "../../types/note"
import {SessionResponseData} from "../../types/user"
import type { User } from "../../types/user"
import { cookies } from "next/headers"
import nextServer from "./api"

export const getUser = async () => {
  const cookieStore = await cookies();
  console.log("SERVER COOKIE:", cookieStore.getAll()); 
  const response = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getNotesServer = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = "",
): Promise<GetNotes> => {
  const cookieStore = await cookies()
  const params: Record<string, string | number> = { page, perPage }

  const headers = { Cookie: cookieStore.toString() }

  if (search.trim() !== "") params.search = search.trim()
  if (tag.trim().toLowerCase() !== "all" && tag.trim() !== "") {
    params.tag = tag.trim()
  }
  const response = await nextServer.get<GetNotes>("/notes", {
    params,
    headers,
  })
  return response.data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies()
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return data
}

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<SessionResponseData>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(), 
    },
  });
  return response;
};