import { Link } from "react-router";

export const Unauthorized = () => {
  return (
    <div>
      <h1>Muri kha tui authorized na</h1>
      <Link to="/"> Home e ja</Link>
    </div>
  );
};
