import { useAppSelector } from '../redux/hooks';
import LogoutButton from './Auth/LogoutButton';
import Dashboard from './Charts/Dashboard';

const Home = () => {
  const email = useAppSelector((state) => state.auth.user);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">MyApp</div>
          <div className="flex items-center gap-6">
            <span className="text-white">{email}</span>
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="container min-h-[calc(100vh-10rem)] mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Interactive Dashboard</h1>
        <Dashboard />
      </main>
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-white">
          &copy; 2024 MyApp. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;