// withAuth.js
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../auth';
import { ComponentType, FC, useEffect } from 'react';

interface WithAuthProps {
  [key: string]: unknown;
}

const withAuth = (WrappedComponent: ComponentType<WithAuthProps>): FC<WithAuthProps> => {
  const WithAuthComponent: FC<WithAuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        // Redirect to login page if not authenticated
        router.replace('/login');
      }
    }, []);

    // If authenticated, render the wrapped component; otherwise, null
    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  // Set the display name for easier debugging
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;
