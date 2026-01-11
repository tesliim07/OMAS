import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          404
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          The page you’re looking for doesn’t exist, or the link is incorrect.
        </p>

        <div>

          <button onClick={() => navigate("/")}>Back to Home Page</button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;