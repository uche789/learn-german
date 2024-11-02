import ErrorText from "@/components/ErrorText";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import RichTextRenderer from "@/components/RichTextRenderer";
import { useGrammarQuery } from "@/lib/api";
import getLangConfig from "@/lib/langConfig";
import { useParams } from "react-router-dom";
import "./GrammarDetailsPage.scss";

export default function GrammarDetailsPage() {
  const params = useParams();
  const { data, isLoading, error } = useGrammarQuery(params.slug || '', getLangConfig(params.lang).language)

  if (isLoading) return <Loading />
  if (error) return <ErrorText text="grammar" />

  return (
    <div className="grammar-details">{data &&
      <>
        <Heading>{data.title}</Heading>
        <RichTextRenderer richTextDocument={data.content.json}/>
      </>
    }
    </div>
  )
}