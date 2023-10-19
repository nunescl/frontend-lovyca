import { useAuth } from '../context/AuthContext';

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();
  console.log(currentUser);

  if (currentUser) {
    return <>{children}</>;
  }

  return null;
}
