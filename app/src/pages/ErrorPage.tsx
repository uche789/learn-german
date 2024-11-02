import Button from "@/components/button/Button";
import { Navigate, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError() as {statusText: string, message: string};
  // console.error(error);
  const navigate = useNavigate()

  return (
    <div id="error-page" className="m-auto text-center mt-20">
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-6xl mt-8" aria-hidden="true">(X _ X)</p>
      <p className="mt-8">Sorry, an unexpected error has occurred.</p>
      <div className="mt-8">
        <Button onClick={() => navigate('/')}>Go back to Homepage</Button>
      </div>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
}
