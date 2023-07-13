export class Result<T> {
  private success_: boolean;
  private value_?: T;
  private errors_?: string[];

  private constructor() {}

  static ok<T>(value: T): Result<T> {
    const result = new Result<T>();
    result.success_ = true;
    result.value_ = value;
    return result;
  }

  static error<T>(errors: string[]): Result<T> {
    const result = new Result<T>();
    result.success_ = false;
    result.errors_ = errors;
    return result;
  }

  get success(): boolean {
    return this.success_;
  }
  get value(): T {
    return this.value_;
  }
  get errors(): string[] {
    return this.errors_;
  }
}
