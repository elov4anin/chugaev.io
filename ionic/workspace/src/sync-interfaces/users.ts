export namespace IUsers {
    export enum IUserRoleEnum {
        admin = 'admin',
        full = 'full',
        guest = 'guest',
    }

    export interface IUser {
        id: string;
        username: string;
        password?: string;
        expired_date?: Date;
        registration_date?: Date;
        role: IUserRoleEnum;
    }
}
