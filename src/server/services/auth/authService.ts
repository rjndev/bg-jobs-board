export async function authUser(email : string | undefined, password : string | undefined) {

  //TODO: Change this to DB login

  if (email == "email" && password == "password")
  {
    return Promise.resolve( {
      user : {
        id : 123,
        email : email,
        password : password
      }
    })
  }
  else 
    throw new Error("Invalid User")

}