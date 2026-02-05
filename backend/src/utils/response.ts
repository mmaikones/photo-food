export function ok<T>(data: T) {
  return { success: true, data } as const;
}

export function fail(message: string, code = "BAD_REQUEST") {
  return { success: false, error: { message, code } } as const;
}
