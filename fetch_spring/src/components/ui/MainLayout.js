import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Logout from "../forum/Logout";

export default function MainLayout() {
  return (
    <div>
      <HeaderNav />
      <Logout />
      <Outlet />
    </div>
  );
}
