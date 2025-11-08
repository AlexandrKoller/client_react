import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export const Layout = () => {
  return (
    <div className="container-fluid">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
