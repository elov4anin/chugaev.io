export namespace IVirtualMachines {
    export enum IVirtualMachinesRoleEnum {
        admin = 'admin',
        full = 'full',
        guest = 'guest',
    }

    export interface IVirtualMachine {
        id: string;
        ip: string;
        port: string;
    }
}
