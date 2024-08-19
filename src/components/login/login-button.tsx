import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import { type FC } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const LoginButtonWithIcon: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Button asChild>
      <Link href="/dashboard">
        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> {children}
      </Link>
    </Button>
  );
};

export { LoginButtonWithIcon };
