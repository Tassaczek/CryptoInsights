import { type FC } from 'react';
import LoginCard from '@/components/login/login-card';

const Home: FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginCard />
    </main>
  );
};

export default Home;
