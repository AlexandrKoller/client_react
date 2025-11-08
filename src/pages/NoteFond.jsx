import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link className="notFound__btn" to="/">
        Home
      </Link>
    </div>
  );
};
