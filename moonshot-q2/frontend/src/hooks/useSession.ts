// import { useNavigate } from "react-router-dom";
import { useGetSessionQuery } from "../redux/api/api-slice";
import { setCredentials } from "../redux/features/auth-slice";
import { useAppDispatch } from "../redux/hooks";

const useSession = () => {
  const { data, isLoading } = useGetSessionQuery("");
  const dispatch = useAppDispatch();
  //  const navigate = useNavigate();
   dispatch(setCredentials(data));
  //  if (data) {
  //    navigate("/");
  //  }

  return { data, isLoading };
};

export default useSession;
