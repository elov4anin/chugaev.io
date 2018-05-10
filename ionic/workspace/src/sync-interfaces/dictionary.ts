export namespace IDictionary {
    export type Primitive = number | string | boolean | Date;

  /*  interface Numeric {
        valueOf(): number;
    }*/

    export type thresholdFreedmanDiaconis = (values: number[], min: number, max: number) => number; // of type ThresholdCountGenerator

    export type thresholdScott = (values: number[], min: number, max: number) => number; // of type ThresholdCountGenerator

    export type thresholdSturges = (values: number[]) => number; // of type ThresholdCountGenerator

    export interface CommonSearchResponse {
        id: string | number;
        text: string;
    }

    export interface CommonSearchParams {
        q: string;
        skip: number;
        take: number;
    }

    export interface CommonByKeyParams {
        key: number;
    }

    export interface CommonByKeysParams {
        keys: number[];
    }

    export interface CommonByKeyResponse {
        id: number | string;
        text: string;
    }

    export interface DxGridPagingRequest {
        skip: number;
        take: number;
        orderby: string;
        order: string;
    }

    export interface DxGridPagingResponse {
        items: any[];
        totalCount: number;
    }


    // OKPD

    export interface OkpdByKeysParams {
        codes: string[];
    }

    export interface OkpdByKeysResponse extends CommonSearchResponse {
        code: string;
        id: string;
        name: string;
        text: string;
    }
}
