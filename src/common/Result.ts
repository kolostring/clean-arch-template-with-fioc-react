type SuccessResult<T> = {
  data: T;
  ok: true;
};

type ErrorResult = {
  error: Error;
  ok: false;
};

export type Result<T> = SuccessResult<T> | ErrorResult;

export function ok<T>(data: T): Result<T> {
  return {
    data,
    ok: true,
  };
}

export function err(error: Error): ErrorResult {
  return {
    error,
    ok: false,
  };
}
