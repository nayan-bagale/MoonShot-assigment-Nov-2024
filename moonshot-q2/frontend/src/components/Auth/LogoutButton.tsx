import { useLogoutMutation } from '../../redux/api/api-slice';
import { setCredentials } from '../../redux/features/auth-slice';
import { useAppDispatch } from '../../redux/hooks';

const LogoutButton = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        // Handle logout logic here
        await logout('');
        dispatch(setCredentials({ email: ''}));
        console.log("User logged out");
    }

  return (
      <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
      >
          Logout
      </button>
  )
}

export default LogoutButton