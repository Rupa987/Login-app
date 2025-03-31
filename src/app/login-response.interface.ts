export interface LoginResponse {
  status: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}
