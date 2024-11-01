import HeadingText from "@/features/layout/components/Heading";
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
                <HeadingText>{idiom.idiom}</HeadingText>
                <div dangerouslySetInnerHTML={{__html: idiom.meaning}} />
                <h2 className="font-semibold text-xl my-4">Examples</h2>
                <div dangerouslySetInnerHTML={{__html: idiom.examples}} />
            </>
        }
        </div>
    )
}