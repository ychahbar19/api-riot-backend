interface User {
  id: string;
  email: string;
  username: string;
  refreshToken: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponse {
  id: string;
  email: string;
  username: string;
  refreshToken?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export { User, UserResponse };
