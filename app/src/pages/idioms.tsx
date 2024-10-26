import { GlobalContext } from "@/context/global";
import { getIdiomsCollection } from "@/lib/api/api";
import categories from "@/lib/categories";
import { IdiomBase, Topic } from "@/lib/types";
import { useContext, useEffect, useState } from "react";

export default function Idioms() {
  const state = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [idioms, setIdioms] = useState<Topic[]>([]) 
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getIdiomsCollection([categories.languages[state.language]]);
        setIdioms(result);
      } catch (error) {
        // set error here
      } finally {
        setLoading(false)
      }
    }
    if (!loading) {
      // fetchData()
    }
  }, [state])

  return <div>Idioms</div>;
}
