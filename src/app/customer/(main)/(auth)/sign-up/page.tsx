'use client';
import { useRouter } from 'next/navigation';

const SomeComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth/sign-up');
  };

  return <button onClick={handleClick}>Go to Sign Up</button>;
};
