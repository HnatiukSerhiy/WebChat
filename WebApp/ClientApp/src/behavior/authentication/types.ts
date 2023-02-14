export type UserState = User | null;

export type User = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  description?: string;
};

export type UserRegisterInput = {
  id: number;
  lastname: string;
  firstname: string;
  password: string;
  email: string;
  description?: string;
};

export type UserLoginInput = {
  email: string;
  password: string;
};

export type UserRegisterResponse = {
    authentication: {
        register: {
            user: User;
            accessToken: string;
            refreshToken: string;
        };
    };
};

export type UserLoginResponse = {
  authentication: {
    login: {
      user: User;
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type UserLogoutResponse = {
  authentication: {
    logout: string;
  };
};

export type RefreshTokenResponse = {
  authentication: {
    refresh: {
      accessToken: string;
      refreshToken: string;
    };
  };
};
