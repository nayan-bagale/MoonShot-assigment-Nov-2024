import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedLayout = () => {
    const session = useAppSelector((state) => state.auth.user);
    
    if (!session) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    )
};

export default ProtectedLayout;