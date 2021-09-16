export interface SignUpBody {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface SignUpReducerState {
  state: string;
  error: string;
}
