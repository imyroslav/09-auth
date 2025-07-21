import type { User, RegisteredUser, CreateUserData, SessionResponseData } from "../../types/user";
import type { Note, NewNoteData, GetNotes } from "../../types/note";
import nextServer from "./api";

export const register = async (payload: CreateUserData) => {
  const response = await nextServer.post<RegisteredUser>("/auth/register", payload)
  return response.data
}

export const login = async (payload: CreateUserData) => {
  const response = await nextServer.post<User>("/auth/login", payload)
  return response.data
}

export const logout = async () => {
  await nextServer.post("/auth/logout")
}

export const getUser = async () => {
  const response = await nextServer.get<User>("/users/me", { withCredentials: true })
  return response.data
}

export const editUser = async (data: { username: string }) => {
  const response = await nextServer.patch<User>("/users/me", data)
  return response.data
}

export const checkSession = async () => {
  try {
    const response = await nextServer.get<SessionResponseData>("/auth/session")
    return response.data;
  } catch {
    throw new Error("Session invalid");
  }
};

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = "",
): Promise<GetNotes> => {
  const params: Record<string, string | number> = { page, perPage }

  if (search.trim() !== "") {
    params.search = search.trim()
  }

  if (tag.trim().toLowerCase() !== "all" && tag.trim() !== "") {
    params.tag = tag.trim()
  }

  const { data } = await nextServer.get<GetNotes>("/notes", {
    params,
    // withCredentials: true,
  })

  return data
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`)
  return data
}

export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", note)
  return data
}

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`)
  return data
}