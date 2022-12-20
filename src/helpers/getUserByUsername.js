export function getUserByUsername(Users, username) {
  const User = Users.filter(obj => {
    return obj.username === username
  })[0]
  
  return User
}