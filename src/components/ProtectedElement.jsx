import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedElement({ children, isAllowed }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      navigate(-1); // Navigate back if the user is not allowed
    }
  }, [isAllowed, navigate]);

  // Render children only if the condition is met
  if (!isAllowed) {
    return null; // Render nothing while navigating
  }

  return <>{children}</>;
}
