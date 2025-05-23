import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nestApi = createApi({
  reducerPath: 'nestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    prepareHeaders: headers => {
      // You can add auth headers here if needed
      return headers;
    },
  }),
  tagTypes: ['User', 'Vehicle', 'Trip'], // Add your entity types here
  endpoints: _builder => ({
    // Endpoints will be added here
  }),
});
