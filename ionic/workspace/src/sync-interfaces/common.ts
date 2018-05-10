export namespace ICommon {
    export type OptionalDecor<T> = { [P in keyof T]?: T[P]; };
    export type ReadOnlyDecor<T> = { readonly [P in keyof T]: T[P]; };
}
