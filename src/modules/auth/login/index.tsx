'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginMutation } from '@/store/api/nestService/modules/auth.api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNo: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type FormField = {
  name: keyof LoginFormData;
  label: string;
  type: string;
  placeholder?: string;
  isPassword?: boolean;
};

const formFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'm@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    isPassword: true,
  },
  {
    name: 'phoneNo',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1234567890',
  },
];

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      if ('data' in response && response.data?.data) {
        const { token, email, phoneNo } = response.data.data;
        router.push(`/verify-otp?token=${token}&email=${email}&phoneNo=${phoneNo}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Image src="/logo.svg" alt="logo" width={168} height={36} priority />
              </CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 text-sm text-red-500">
                  {('data' in error && (error.data as { message?: string })?.message) ||
                    'An error occurred during login'}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {formFields.map(field => (
                    <div key={field.name} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={
                            field.isPassword ? (showPassword ? 'text' : 'password') : field.type
                          }
                          placeholder={field.placeholder}
                          {...register(field.name)}
                          disabled={isLoading}
                        />
                        {field.isPassword && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <Eye className="h-4 w-4 text-gray-500" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="sr-only">
                              {showPassword ? 'Hide password' : 'Show password'}
                            </span>
                          </Button>
                        )}
                      </div>
                      {errors[field.name] && (
                        <p className="text-sm text-red-500">{errors[field.name]?.message}</p>
                      )}
                    </div>
                  ))}
                  <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                    {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
Login.displayName = 'Login';
export default Login;
