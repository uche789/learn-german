import ErrorText from "@/components/ErrorText";
import HeadingText from "@/components/Heading";
import Loading from "@/components/Loading";
import { useIdiomQuery } from "@/lib/api";
import { useParams } from "react-router-dom";
import "./IdiomDetailsPage.scss"
import { GlobalContext } from "@/context/global";
import { useContext } from "react";

export default function () {
  const params = useParams();
  const state = useContext(GlobalContext);
  const { data, isLoading, error } = useIdiomQuery(params.slug || '', state.language)

  if (isLoading) return <Loading />
  if (error) return <ErrorText text="idiom" />

  return (
    <div className="idiom-details">{data &&
      <>
        <HeadingText>{data.idiom}</HeadingText>
        <div dangerouslySetInnerHTML={{ __html: data.meaning }} />
        <h2 className="font-semibold text-xl my-4">Examples</h2>
        <div dangerouslySetInnerHTML={{ __html: data.examples }} />
      </>
    }
    </div>
  )
}