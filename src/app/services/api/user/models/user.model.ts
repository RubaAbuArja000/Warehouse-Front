export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateUserRequest {
  email: string;
  fullName: string;
  role: string;
  password: string;
  isActive: boolean;
}

export interface UpdateUserRequest {
  fullName: string;
  role: string;
  isActive: boolean;
}
