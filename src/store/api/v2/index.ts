import { getCookie } from '@/lib/methods';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_V2_API_BASE || 'v2-api-base-url';
enum Environment {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}
const DUMMY_JWT = process.env.NEXT_PUBLIC_DUMMY_JWT || 'dummy-jwt';

const prepareHeaders = (headers: Headers) => {
  const isLocal = process.env.NEXT_PUBLIC_ENVIRONMENT === Environment.LOCAL;

  if (isLocal) {
    headers.set('Authorization', `Bearer ${DUMMY_JWT}`);
  } else {
    const token = getCookie('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return headers;
};

export const v2Api = createApi({
  reducerPath: 'v2Api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders,
  }),
  tagTypes: [], // Add your entity types here
  endpoints: () => ({}),
});
