export interface User {
  username: string
  email: string
  avatar: string
}

export type RegisteredUser = Pick<User, "email" | "username">

export type CreateUserData = {
  email: string
  password: string
  name?: string
}

