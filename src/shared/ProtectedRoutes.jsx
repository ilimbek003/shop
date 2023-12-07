import cookie from "cookie_js";
import { Navigate, Outlet } from "react-router-dom";

export const useAuth = () => {
  const user = cookie.get("token_opop");
  return !!user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/auth/" />
};

export default ProtectedRoutes;
