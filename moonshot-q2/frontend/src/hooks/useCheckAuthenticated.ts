import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';


const useCheckAuthenticated = () => {
      const session = useAppSelector((state) => state.auth.user);
      const navigate = useNavigate();

      if (session) {
        navigate('/');
      }
}

export default useCheckAuthenticated