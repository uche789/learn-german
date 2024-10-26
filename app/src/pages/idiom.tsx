import { Idiom } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const param = useParams();
    const [idiom, setIdiom] = useState<Idiom>();

    useEffect(() => {

    }, [])

    return (
        <div>Idiom {idiom?.idiom}</div>
    )
}