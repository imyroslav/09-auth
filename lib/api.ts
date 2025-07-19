import axios from "axios";
import type { Note } from "../types/note"


export type GetNotes = {
  notes: Note[];
  totalPages: number;
  tag: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};


const request = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

export const getNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag = ""
): Promise<GetNotes> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") {
    params.search = search.trim();
  }

  if (tag.trim().toLowerCase() !== "all" && tag.trim() !== "") {
    params.tag = tag.trim();
  }
  

  const { data } = await request.get<GetNotes>("/notes", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params,
  });
  // console.log(data)
  return data;
};



export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await request.post<Note>("/notes", note, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await request.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await request.get<Note>(`/notes/${id}`, {
     headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })
  return data;
}
