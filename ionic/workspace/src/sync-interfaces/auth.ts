import {IUsers} from "./users";
import IUser = IUsers.IUser;

export namespace IAuth {

  export interface IAuthParams {
    login: string;
    password: string;
  }

  export interface IAuthResponse {
    access_token: string;
  }

  export interface IAuthTokenInfo {
    exp: number;
    user: IUser;
  }
}
