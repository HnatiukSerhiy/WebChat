export const searchUserQuery = `
query searchUser($input:String){
  user{
    search{
      id
      firstname
      lastname
      email
    }
  }
}`;