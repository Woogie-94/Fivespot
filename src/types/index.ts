export enum REQUEST_STATES {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

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

export interface LoginBody {
  user: {
    email: string;
    password: string;
  };
}

export interface LoginReducerState {
  state: string;
  error: string;
}
