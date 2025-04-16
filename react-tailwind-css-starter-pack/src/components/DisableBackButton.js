import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DisableBackAndForward = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      navigate(location.pathname); // stay on same page
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location]);

  return null;
};

export default DisableBackAndForward;
