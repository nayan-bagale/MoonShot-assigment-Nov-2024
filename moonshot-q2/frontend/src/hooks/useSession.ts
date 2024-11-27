import { useGetSessionMutation } from "../redux/api/api-slice";
import { setCredentials } from "../redux/features/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useLayoutEffect } from "react";

const useSession = () => {
  const [getSession,{ isLoading }] = useGetSessionMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const fetchSession = async () => {
      const data = await getSession('').unwrap();
      // if(!data) return;
      dispatch(setCredentials(data));
    }
    
     fetchSession();
    
  }, [])

  return { user, isLoading };
};

export default useSession;
