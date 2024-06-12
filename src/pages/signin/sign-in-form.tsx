'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { LoginInfo } from "@/types/SignUpAccount"
import AuthService from "@/services/AuthService";
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/auth'; // Import your authSlice
import { loginFailToast, loginSuccessToast } from '@/components/Toast';

const initialValues: LoginSchema = {
  email: 'superadmin@gmail.com',
  password: '12345678',
  rememberMe: true,
};
interface User {
  username: string;
  email: string;
}

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    // Map properties from LoginSchema to LoginInfo
    const loginData: LoginInfo = {
      email: data.email,
      password: data.password
    };

    try {
      // Call AuthService.Login with the mapped data
      const response = await AuthService.Login(loginData);
      
      // Dispatch the login action with the response data if login is successful
      if (response && response.statusCode === 200) {
        const { username,accessToken,permissions } = response;
    
        console.log(accessToken);
        dispatch(login({ accessToken, user: { username, email: data.email ,permissions:permissions} }));
        loginSuccessToast()
      } else {
        // Handle invalid credentials or other error cases
        console.log("Login failed");
        loginFailToast()
      }
    } catch (error) {
      loginFailToast()
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg" color="info">
              <span>Sign in</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
