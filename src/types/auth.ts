
export interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  role: "merchant" | "user";
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
