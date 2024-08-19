import { type FC } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginButtonWithIcon } from '@/components/login/login-button';
import { Button } from '@/components/ui/button';

const LoginCard: FC = () => {
  return (
    <>
      <Card className="md:min-w-[300px]">
        <CardHeader className="flex items-center">
          <CardTitle>Login to dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LoginButtonWithIcon>Login with email</LoginButtonWithIcon>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="text-xs text-gray-400" variant="link" asChild>
            <Link href="/terms-and-conditions">T&C</Link>
          </Button>
          <Button className="text-xs text-gray-400" variant="link" asChild>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginCard;
