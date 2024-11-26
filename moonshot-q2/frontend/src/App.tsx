import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Auth/Login";
import SignupPage from "./components/Auth/Signup";
import HomePage from "./components/Home";
import ProtectedPage from "./components/Layout/ProtectedPages";
import useSession from "./hooks/useSession";

function App() {
  useSession()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedPage />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App;
