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
            refreshToken{
                token
                expires
            }
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
            refreshToken{
                token
                expires
            }
        }
    }
}`;

export const refreshTokenMutation =
`mutation refresh{
    authentication{
        refresh{
            accessToken
            refreshToken{
                token
                expires
            }
        }
    }
}`;

export const logoutUserMutation =
`mutation logout{
    authentication{
        logout
    }
}`;
