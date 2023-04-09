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