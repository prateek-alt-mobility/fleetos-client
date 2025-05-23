import { v1Api } from '..';

enum AUTH_API_ENDPOINTS {
  FETCH_USER_PERMISSIONS = '/rolePerms.getUserPerms',
}

export const authApi = v1Api.injectEndpoints({
  endpoints: builder => ({
    fetchUserPermissions: builder.query({
      query: () => AUTH_API_ENDPOINTS.FETCH_USER_PERMISSIONS,
    }),
  }),
});

export const { useFetchUserPermissionsQuery } = authApi;
