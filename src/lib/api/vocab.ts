import { VocabularyType } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const base_url = import.meta.env.BACKEND_ENDPOINT;

const fetchData = async (path: string, method = 'GET', body?: string | FormData, headers = {}) => {
  const response = await fetch(base_url + path, {
    method,
    body,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      window.location.assign('/admin/login')
      return;
    }

    throw new Error(response.statusText);
  }

  try {
    const result = await response.json()
    return result;
  } catch {
    return {};
  }
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

export const getVocabulary = async (lang: string, query?: string): Promise<VocabularyType[] | undefined> => {
  const queryParam = query ? `&query=${query}` : ''
  return await fetchData(
    `/vocabulary?lang=${lang}${queryParam}`,
    'GET',
    undefined,
    {
      'X-API-KEY': import.meta.env.VITE_API_KEY
    }
  );
}

export const getVocabularySlug = async (word: string, langCode: string): Promise<VocabularyType | undefined> => {
  return fetchData(
    `/vocabulary/slug/${word}?lang=${langCode}`,
    'GET',
    undefined,
    {
      'X-API-KEY': import.meta.env.VITE_API_KEY
    }
  );
}

export const getVocabularyById = async (id: number): Promise<VocabularyType | undefined> => {
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

export const addVocabulary = async (payload: Omit<VocabularyType, 'vocab_id'>): Promise<VocabularyType> => {
  return await fetchData(
    '/vocabulary',
    'post',
    JSON.stringify(payload),
    {
      'Content-Type': 'application/json',
    },
  );
}

export const updatedVocabulary = async (vocab_id: number, payload: Omit<VocabularyType, 'vocab_id'>): Promise<VocabularyType> => {
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

/*----------- TANSTACK QUERIES -----------------*/

export const useVocabularyQuery = (langCode: string, query?: string) => {
  return useQuery({
    queryKey: ['vocabulary', langCode, query],
    queryFn: () => getVocabulary(langCode, query),
    staleTime: 1000 * 60 * 5, // 30 minutes
    retry: 1,
  });
}

export const useSingleVocabularyQuery = (id: number) => {
  return useQuery({
    queryKey: ['vocabulary', id],
    queryFn: () => getVocabularyById(id),
    staleTime: 1000 * 60 * 5, // 30 minutes
    retry: 1,
  });
}

export const useSingleVocabularySlugQuery = (word: string, langCode: string) => {
  return useQuery({
    queryKey: ['vocabulary', word, langCode],
    queryFn: () => getVocabularySlug(word, langCode),
    staleTime: 1000 * 60 * 5, // 30 minutes
    retry: 1,
  });
}

export const useAddVocabularyMutation = (payload: Omit<VocabularyType, "vocab_id">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addVocabulary(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vocabulary"],
      })
    }
  })
}

export const useUpdateVocabularyMutation = (vocab_id: number, payload: Omit<VocabularyType, "vocab_id">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updatedVocabulary(vocab_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vocabulary"],
      })
    }
  })
}

export const useDeleteVocabularyMutation = (vocab_id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteVocabulary(vocab_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vocabulary"],
      })
    }
  })
}

export const useFileUploadVocabularyMutation = (formData: FormData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => uploadFile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vocabulary"],
      })
    }
  })
}


