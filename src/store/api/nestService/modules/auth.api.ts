import { nestApi } from '..';

enum AUTH_API_ENDPOINTS {
  LOGIN = '/auth/login/email',
  VERIFY_OTP = '/auth/login/verify-otp',
}

type LoginPayload = {
  email: string;
  password: string;
  phoneNo: string;
};

type LoginResponse = {
  statusCode: number;
  status: string;
  message: string;
  data: {
    token: string;
    accessType: number;
    email: string;
    phoneNo: string;
  };
};

type VerifyOtpPayload = {
  token: string;
  otp: string;
  email: string;
  phoneNo: string;
};

type VerifyOtpResponse = {
  statusCode: number;
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const authApi = nestApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: payload => ({
        url: AUTH_API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: payload => ({
        url: AUTH_API_ENDPOINTS.VERIFY_OTP,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyOtpMutation } = authApi;
