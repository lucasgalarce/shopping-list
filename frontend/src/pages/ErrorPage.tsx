import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message || "Unknown Error"}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
