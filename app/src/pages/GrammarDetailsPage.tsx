import Heading from "@/features/layout/components/Heading";
import { useGrammarQuery } from "@/lib/api";
import getLangConfig from "@/lib/langConfig";
import { useParams } from "react-router-dom";

export default function SingleGrammar() {
    const params = useParams();
    const {data, isLoading, error} = useGrammarQuery(params.slug || '', getLangConfig(params.lang).language)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading grammar</div>;

    return (
        <div>{data &&
            <>
                <Heading>{data.title}</Heading>
            </>
        }
        </div>
    )
}