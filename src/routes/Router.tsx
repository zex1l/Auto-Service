import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { FC } from "react";
import SignIn from "../pages/SignIn/SignIn";
import Redocrds from "../pages/Records/Redocrds";
import useAuth from "../modules/AuthForm/useAuth";
import SignUp from "../pages/SignUp/SignUp";
import { LK } from "../pages/LK/LK";

interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

const Router: FC<RoutesProps> = ({ location }) => {
  const { user } = useAuth();

  return (
    <Routes location={location}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/lk" element={<LK />} />
      <Route path="*" element={<Home />} />
      <Route
        path="/records"
        element={user?.email === 'admin@mail.ru' ? <Redocrds /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
};

export default Router;
