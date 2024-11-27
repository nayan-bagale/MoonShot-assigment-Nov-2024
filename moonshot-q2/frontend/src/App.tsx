import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Auth/Login";
import SignupPage from "./components/Auth/Signup";
import HomePage from "./components/Home";
import ProtectedPage from "./components/Layout/ProtectedPages";
import useSession from "./hooks/useSession";
import AuthPages from "./components/Layout/AuthPages";
import Auth from "./components/Auth/Auth";

function App() {
  const { user, isLoading } = useSession();
  return (
    <>
      {user ? <HomePage /> : <Auth />}
    </>
    // <Routes>
    //   <Route element={<AuthPages />}>
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/signup" element={<SignupPage />} />
    //   </Route>
    //   <Route element={<ProtectedPage />}>
    //     <Route path="/" element={<HomePage />} />
    //   </Route>
    // </Routes>
  )
}

export default App;
