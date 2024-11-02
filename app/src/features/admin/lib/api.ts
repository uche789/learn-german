import { VocabularyType } from "@/lib/types";

export const getVocabulary = async (lang: string, query?: string) => {
    const queryParam = query ? `&query=${query}` : ''
    const request = await fetch(`http://localhost:8000/vocabulary?lang=${lang}${queryParam}`);

    if (!request.ok) {
        throw new Error(request.statusText);
    }

    const body = await request.json()
    return body;
}

export const getVocabularyById = async (id: number) => {
    const request = await fetch(`http://localhost:8000/vocabulary/${id}`);

    if (!request.ok) {
        throw new Error(request.statusText);
    }

    const body = await request.json()
    return body;
}

export const deleteVocabulary = async (id: number) => {
    const request = await fetch(`http://localhost:8000/vocabulary/${id}`, { method: 'delete'});

    if (!request.ok) {
        throw new Error(request.statusText);
    }
    const body = await request.json();
    return body;
}

export const addVocabulary = async (payload: Omit<VocabularyType, 'vocab_id'>) => {
    const request = await fetch(`http://localhost:8000/vocabulary`, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!request.ok) {
        throw new Error(request.statusText);
    }

    const body = await request.json()
    return body;
}

export const updatedVocabulary = async (vocab_id: number, payload: Omit<VocabularyType, 'vocab_id'>) => {
    const request = await fetch(`http://localhost:8000/vocabulary/${vocab_id}`, {
        method: 'put',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!request.ok) {
        throw new Error(request.statusText);
    }

    const body = await request.json()
    return body;
}

export const uploadFile = async (formData: FormData) => {
    const request = await fetch(`http://localhost:8000/vocabulary/file`, { 
        method: 'post',
        body: formData,
    });

    if (!request.ok) {
        throw new Error(request.statusText);
    }

    const body = await request.json()
    return body;
}