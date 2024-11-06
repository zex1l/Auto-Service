import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { FC } from "react";
import SignIn from "../pages/SignIn/SignIn";
import Redocrds from "../pages/Records/Redocrds";
import useAuth from "../modules/AuthForm/useAuth";

interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

const Router: FC<RoutesProps> = ({ location }) => {
  const { user } = useAuth();

  return (
    <Routes location={location}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route
        path="/records"
        element={user ? <Redocrds /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
};

export default Router;
