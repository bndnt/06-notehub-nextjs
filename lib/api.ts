import axios from "axios";
import type { CreateNoteData, Note } from "@/types/note";
const BASE_URL = "https://notehub-public.goit.study/api/notes";
export interface FetchNotesResponse {
  page: number;
  notes: Note[];
  totalPages: number;

  // total_results: number;
}

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesResponse> {
  // search: string
  // page: number
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}`, {
    params: {
      search,
      // include_adult: false,
      // language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data);

  return response.data;
}
export const createNote = async (data: CreateNoteData) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.post<Note>(BASE_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const deleteNote = async (id: Note["id"]) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export async function fetchNoteById(noteId: Note["id"]) {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
