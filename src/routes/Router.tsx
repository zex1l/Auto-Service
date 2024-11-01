import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import { FC, useEffect } from "react";
import SignIn from "../pages/SignIn/SignIn";
import Redocrds from "../pages/Records/Redocrds";
import useAuth from "../modules/AuthForm/useAuth";

interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

const Router: FC<RoutesProps> = ({ location }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/records");
    }
  }, [user]);

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
