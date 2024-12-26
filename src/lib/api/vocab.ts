import { VocabularyType } from "@/lib/types";

const base_url = import.meta.env.PROD ? 'https://' : 'http://localhost:8000';

const fetchData = async (path: string, method = 'GET', body?: string | FormData, headers = {}) => {
    const response = await fetch(base_url + path, {
        method,
        body,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        if ([401,403].includes(response.status)) {
            window.location.assign('/learn-german/admin/login')
            return;
        }

        throw new Error(response.statusText);
    }

    const result = await response.json()
    return result;
}

export const login = async (formData: FormData) => {
    await fetchData(
        '/login',
        'POST',
        formData,
    )
}

export const logout = async () => {
    await fetchData(
        '/logout',
        'POST'
    )
}

export const startAuth = async () => {
    return await fetchData('/auth')
}

export const checkAuth = async () => {
    try {
        const response = await fetch(base_url + '/auth', { credentials: 'include' })
        return response.ok
    } catch {
        window.alert('Something went wrong')
    }
}

export const getVocabulary = async (lang: string, query?: string) => {
    const queryParam = query ? `&query=${query}` : ''
    return fetchData(
        `/vocabulary?lang=${lang}${queryParam}`,
        'GET',
        undefined,
        {
            'X-API-KEY': import.meta.env.VITE_API_KEY
        }
    );
}

export const getVocabularyById = async (id: number) => {
    return await fetchData(
        `/vocabulary/${id}`,
        'GET',
        undefined,
        {
            'X-API-KEY': import.meta.env.VITE_API_KEY
        }
    );
}

export const deleteVocabulary = async (id: number) => {
    return await fetchData(`/vocabulary/${id}`, 'delete');
}

export const addVocabulary = async (payload: Omit<VocabularyType, 'vocab_id'>) => {
    return await fetchData(
        '/vocabulary',
        'post',
        JSON.stringify(payload),
        {
            'Content-Type': 'application/json',
        },
    );
}

export const updatedVocabulary = async (vocab_id: number, payload: Omit<VocabularyType, 'vocab_id'>) => {
    return await fetchData(
        `/vocabulary/${vocab_id}`,
        'put',
        JSON.stringify(payload),
        {
            'Content-Type': 'application/json',
        },
    );
}

export const uploadFile = async (formData: FormData) => {
    return await fetchData(
        '/vocabulary/file', 
        'post',
        formData,
    );
}