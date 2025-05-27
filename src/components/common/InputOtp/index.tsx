import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { forwardRef } from 'react';

interface InputOTPComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const InputOTPComponent = forwardRef<HTMLInputElement, InputOTPComponentProps>(
  ({ onChange, disabled, value }, ref) => {
    return (
      <InputOTP maxLength={6} value={value} onChange={onChange} disabled={disabled} ref={ref}>
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPGroup key={index}>
            <InputOTPSlot index={index} />
          </InputOTPGroup>
        ))}
      </InputOTP>
    );
  }
);

InputOTPComponent.displayName = 'InputOTP';
export default InputOTPComponent;
