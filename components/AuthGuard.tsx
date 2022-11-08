import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  console.log(currentUser);

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push('/login');
  //   }
  // }, [currentUser, router]);

  if (currentUser) {
    return <>{children}</>;
  }

  return null;
}
