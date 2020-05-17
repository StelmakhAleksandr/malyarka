export interface User {
  id: number;
  name: string;
}

export interface UserApi {
  user: User;
  token: string;
}
