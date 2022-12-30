declare module '@tongtwist/result-js/Result' {
  export type TSuccessResultCreationProperties<R, N> = [R, N];
  export type TErrorResultCreationProperties<N> = [N, string | Error];
  export type TResultCreationProperties<R = unknown, N = null> = TSuccessResultCreationProperties<R, N> | TErrorResultCreationProperties<N>;
  export class Result<R = unknown> {
      readonly props: TResultCreationProperties<R>;
      private readonly _error?;
      private readonly _value?;
      private readonly _ok;
      private constructor();
      get error(): Error | undefined;
      get value(): R | undefined;
      get isOk(): boolean;
      get isSuccess(): boolean;
      get isError(): boolean;
      get isFailure(): boolean;
      static success<R = unknown>(value: R): Result<R>;
      static fail<R = unknown>(err: string | Error): Result<R>;
  }

}
declare module '@tongtwist/result-js/index' {
  export * from "@tongtwist/result-js/Result";

}
declare module '@tongtwist/result-js' {
  import main = require('@tongtwist/result-js/index');
  export = main;
}