"use client";

import { useRouter } from "next/navigation";
import { createNote, NewNoteData } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraftStore } from "../../lib/store/noteStore";
import css from "./NoteForm.module.css";

export const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

   const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/All");


  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title" >Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft?.title}
          // value={title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          // value={content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          // value={tag}
          defaultValue={draft?.tag}
          onChange={handleChange}
          required
        >
          <option value="">Select a tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
        <button type="button" onClick={handleCancel}>Cancel</button>
        
      </div>
    </form>
  );
};