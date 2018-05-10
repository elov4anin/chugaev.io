export namespace IProjects {
    export enum IProjectsRoleEnum {
        admin = 'admin',
        full = 'full',
        guest = 'guest',
    }

    export interface IProject {
        id: string;
        virtual_machine_id: string;
        name?: string;
        domain?: string;
        gitlab?: string;
        comment?: string;
        accounts?: Account[];
    }

    export interface Account {
        login?: string;
        password?: string;
    }
}
