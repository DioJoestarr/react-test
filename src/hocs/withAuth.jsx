import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import JwtService from "../services/JwtService";

export const withAuth = (WrappedComponent, redirectTo) => {
  const WithAuthRedirectComponent = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false);
      if (JwtService.getAccessToken()) return;
      // toast.error("Phiên đăng nhập hết hạn");
      navigate(redirectTo || "/login");
    }, []);
    if (loading) return <></>;
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectComponent;
};
