'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useVerifyOtpMutation } from '@/store/api/nestService/modules/auth.api';
import Image from 'next/image';

const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

const VerifyOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      const token = searchParams.get('token');
      const email = searchParams.get('email');
      const phoneNo = searchParams.get('phoneNo');

      if (!token || !email || !phoneNo) {
        throw new Error('Missing required parameters');
      }

      const response = await verifyOtp({
        token,
        otp: data.otp,
        email,
        phoneNo,
      });

      if ('data' in response && response.data?.data) {
        // Store the tokens
        const { accessToken, refreshToken } = response.data.data;
        // TODO: Store tokens in secure storage
        console.log('Tokens received:', { accessToken, refreshToken });

        // Redirect to dashboard or home page
        router.push('/');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
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
              <CardDescription>Enter the OTP sent to your phone number</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      {...register('otp')}
                      disabled={isLoading}
                    />
                    {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
                    {isLoading || isSubmitting ? 'Verifying...' : 'Verify OTP'}
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

VerifyOtp.displayName = 'VerifyOtp';
export default VerifyOtp;
