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

export interface GetArticlesBody {
  tag?: string;
  author?: string;
  favorited?: string;
  limit: number;
  offset: number;
}

export interface Author {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
}

export interface Article {
  createdAt: string;
  updatedAt: string;
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}

export interface ArticlesReducerState {
  state: string;
  articles: Article[];
  error: string;
}

export interface UserInfo {
  state: boolean;
  email: string;
  username: string;
  token: string;
}

export interface CommentType {
  createdAt: string;
  updatedAt: string;
  id: number;
  body: string;
  author: Author;
}
