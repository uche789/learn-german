import { getIdiom } from "@/lib/api/api";
import { Idiom } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const param = useParams();
    const [idiom, setIdiom] = useState<Idiom>();

    useEffect(() => {
        async function fetchData() {
            if (param.slug) {
                const result = await getIdiom(param.slug);
                setIdiom(result)
            }
        }
        fetchData();
    }, [])

    return (
        <div>{idiom &&
            <>
                <h1>{idiom.idiom}</h1>
                <div dangerouslySetInnerHTML={{__html: idiom.meaning}} />
                <h2>Examples</h2>
                <div dangerouslySetInnerHTML={{__html: idiom.examples}} />
            </>
        }
        </div>
    )
}