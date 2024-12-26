import ErrorText from "@/components/ErrorText";
import Heading from "@/components/Heading";
import Loading from "@/components/Loading";
import RichTextRenderer from "@/components/RichTextRenderer";
import { useGrammarQuery } from "@/lib/api";
import { useParams } from "react-router-dom";
import "./GrammarDetailsPage.scss";
import { GlobalContext } from "@/context/global";
import { useContext } from "react";

export default function GrammarDetailsPage() {
  const params = useParams();
  const state = useContext(GlobalContext);
  const { data, isLoading, error } = useGrammarQuery(params.slug || '', state.language)

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