export const loginUserMutation =
`mutation login($input:UserLoginInput!){
  authentication{
    login(input:$input){
      user{
        id
        lastname
        firstname
        email
        description
      }
      accessToken
      refreshToken
    }
  }
}`;

export const registerUserMutation =
`mutation register($input:UserRegisterInput!){
  authentication{
    register(input:$input){
      user{
        id
        lastname
        firstname
        email
        description
      }
      accessToken
      refreshToken
    }
  }
}`;

export const refreshTokenMutation =
`mutation refresh{
  authentication{
    refresh{
      accessToken
      refreshToken
    }
  }
}`;

export const logoutUserMutation =
`mutation logout{
  authentication{
    logout
  }
}`;
