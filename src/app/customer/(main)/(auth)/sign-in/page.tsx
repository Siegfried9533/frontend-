'use client';
import { useRouter } from 'next/navigation';

const SomeComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/sign-in');
  };

  return <button onClick={handleClick}>Go to Sign In</button>;
};
