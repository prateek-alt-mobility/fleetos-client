import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function InputOTPComponent() {
  return (
    <InputOTP maxLength={6}>
      {Array.from({ length: 6 }).map((_, index) => (
        <InputOTPGroup>
          <InputOTPSlot key={index} index={index} />
        </InputOTPGroup>
      ))}
    </InputOTP>
  );
}

export default InputOTPComponent;
