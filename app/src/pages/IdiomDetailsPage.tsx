import HeadingText from "@/features/layout/components/Heading";
import { getIdiom, useIdiomQuery } from "@/lib/api";
import getLangConfig from "@/lib/langConfig";
import { Idiom } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const params = useParams();
    const [idiom, setIdiom] = useState<Idiom>();
    const { data, isLoading, error } = useIdiomQuery(params.slug || '', getLangConfig(params.lang).language)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading Idiom</div>;

    return (
        <div>{data &&
            <>
                <HeadingText>{data.idiom}</HeadingText>
                <div dangerouslySetInnerHTML={{__html: data.meaning}} />
                <h2 className="font-semibold text-xl my-4">Examples</h2>
                <div dangerouslySetInnerHTML={{__html: data.examples}} />
            </>
        }
        </div>
    )
}