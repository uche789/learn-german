import Heading from "@/features/layout/components/Heading";
import { getIdiom, getPost } from "@/lib/api/api";
import { Idiom, Post } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleGrammar() {
    const param = useParams();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        async function fetchData() {
            if (param.slug) {
                const result = await getPost(param.slug);
                setPost(result)
            }
        }
        fetchData();
    }, [])

    return (
        <div>{post &&
            <>
                <Heading>{post.title}</Heading>
            </>
        }
        </div>
    )
}