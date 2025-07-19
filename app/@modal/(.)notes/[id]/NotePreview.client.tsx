'use client'

import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../components/Modal/Modal";
import { fetchNoteById } from "../../../../lib/api";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";



const NotePreview = () => {
    const { id } = useParams<{ id: string}>();
    const router = useRouter();

    const { data: note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <Modal><p>is Loading...</p></Modal>;
    if (error || !note) return <Modal><p>is error loading note</p></Modal>;

    return ( 
    <Modal onClose={() => router.back()}>
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                <h2>{note.title}</h2>
                <span className={css.tag}>{note.tag}</span>
          </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.updatedAt ?? note.createdAt}</p>
            <button onClick={() => router.back()} className={css.backBtn}>
                    Go back
            </button>
            </div>
       </div>
    </Modal>
    );
};

export default NotePreview;