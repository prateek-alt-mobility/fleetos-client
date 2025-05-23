import { v1Api } from '..';

enum AUTH_API_ENDPOINTS {
  CHECK_LOGIN = '/auth.checklogin',
  FETCH_USER_PERMISSIONS = '/rolePerms.getUserPerms',
}

type CheckLoginResponse = {
  result: {
    data: {
      message: string;
    };
  };
};

type Permission = {
  id: number;
  permission_name: string;
  code_name: string;
  accessible: boolean;
};

type Module = {
  id: number;
  module_name: string;
  module_code: string;
  accessible: boolean;
  permissions: Permission[];
};

type FetchUserPermissionsResponse = {
  result: {
    data: {
      id: number;
      role_name: string;
      modules: Module[];
    };
  };
};

export const authApi = v1Api.injectEndpoints({
  endpoints: builder => ({
    checkLogin: builder.query<CheckLoginResponse, void>({
      query: () => AUTH_API_ENDPOINTS.CHECK_LOGIN,
    }),
    fetchUserPermissions: builder.query<FetchUserPermissionsResponse, void>({
      query: () => AUTH_API_ENDPOINTS.FETCH_USER_PERMISSIONS,
    }),
  }),
});

export const { useCheckLoginQuery, useFetchUserPermissionsQuery } = authApi;
