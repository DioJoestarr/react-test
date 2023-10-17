
import { useEffect } from "react";

import { useUser } from "../store/UserStore";
import { useNavigate } from "react-router-dom";

export const withAuth = (WrappedComponent, redirectTo) => {
  const WithAuthRedirectComponent = (props) => {
    const navigate = useNavigate();
    const  user = useUser();
    console.log(user)
    useEffect(() => {
      if (user) return;
      // toast.error("Phiên đăng nhập hết hạn");
      navigate(redirectTo || "/login");
    }, [user]);
    if (!user) return <></>;
    return <WrappedComponent {...props} user={user} />;
  };
  return WithAuthRedirectComponent;
};
