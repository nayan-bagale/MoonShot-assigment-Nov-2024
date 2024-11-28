import { useAppSelector } from '../redux/hooks';
import LogoutButton from './Auth/LogoutButton';
import Dashboard from './Charts/Dashboard';
import CookieSettingsDropdown from './CookiesDropDown';

const Home = () => {
  const email = useAppSelector((state) => state.auth.user);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">{email}</div>
          <div className="flex items-center gap-6">
            <LogoutButton />
            <CookieSettingsDropdown/>
          </div>
        </div>
      </nav>
      <main className="container min-h-[calc(100vh-10rem)] mx-auto p-4">
        <Dashboard />
      </main>
    </>
  );
};

export default Home;