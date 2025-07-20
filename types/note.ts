export interface Note {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  tag: string
};

export interface Tag {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  tag: string
};

export type GetNotes = {
  notes: Note[];
  totalPages: number;
  tag: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};