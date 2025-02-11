import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
