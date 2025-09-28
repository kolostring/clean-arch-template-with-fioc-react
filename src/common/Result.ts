type SuccessResult<T> = {
  data: T;
  ok: true;
};

type ErrorResult = {
  error: {
    message: string;
    code?: string;
    stack?: string;
  };
  ok: false;
};

export type Result<T> = SuccessResult<T> | ErrorResult;

export function ok<T>(data: T): Result<T> {
  return {
    data,
    ok: true,
  };
}

export function err(
  message: string,
  code?: string,
  stack?: string
): ErrorResult {
  return {
    error: {
      message,
      code,
      stack,
    },
    ok: false,
  };
}
