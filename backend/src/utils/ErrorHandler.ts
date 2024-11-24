export function ErrorHandler(statusCode: number, message: string) {
  const err: any = new Error();
  err.statusCode = statusCode;
  err.message = message;
  return err;
}
