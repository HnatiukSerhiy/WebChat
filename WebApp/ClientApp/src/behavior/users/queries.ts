export const searchUserQuery =
`query searchUser($input:String){
  user{
    searchByName(pattern:$input) {
      id
      firstname
      lastname
      email
      password
      description
    }
  }
}`;

export const getAllUsersQuery =
`query getAll{
  user{
    getAll{
      id
      firstname
      lastname
      email
      password
      description
    }
  }
}`;
