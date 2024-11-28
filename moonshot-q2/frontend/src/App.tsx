import Auth from "./components/Auth/Auth";
import HomePage from "./components/Home";
import useSession from "./hooks/useSession";

function App() {
  const { user, isLoading } = useSession();
  return (
    <>
      {user ? <HomePage /> : <Auth />}
    </>)
}

export default App;
