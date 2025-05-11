import { useQuery } from "@tanstack/react-query";
import NotFound from "./errors/NotFound";

// todo: possibly move this to the database
const getReponse = async (langCode: string) => {
  const response = await fetch("/speaking.json", {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new NotFound()
  }

  return (await response.json())[langCode];
}

export const useSpeakingQuery = (langCode: string) => {
  return useQuery({
    queryKey: ['vocabulary', langCode],
    queryFn: () => getReponse(langCode),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}