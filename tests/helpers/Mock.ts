import * as assert from "assert";

class MethodNotSetupException extends Error {
  constructor(methodName: string) {
    super();
    this.message = `${methodName} could not be verified because it was never mocked`;
  }
}

class MethodNotCalledException extends Error {
  constructor(methodName: string, expectedNumOfCalls: number, actualNumOfCalls: number) {
    super();
    this.message =
      `${methodName} was expected to be called ${expectedNumOfCalls} times` +
      ` but was actually called ${actualNumOfCalls}`;
  }
}

class IncorrectNumOfExpectedArgs extends Error {
  constructor(numOfCalls: number, argLength: number) {
    super();
    this.message =
      "Length of the args list must match the expected number of method calls." +
      ` ${argLength} args was given for ${numOfCalls} method calls`;
  }
}

class IncorrectArgsPassedException extends Error {
  constructor(methodName: string, expectedArgs: any[], actualArgs: any[]) {
    super();
    this.message = `${methodName} was called with incorrect args:
Expected Args: ${JSON.stringify(expectedArgs, null, 2)}
Actual Args: ${JSON.stringify(actualArgs, null, 2)}`;
  }
}

class MethodCallRecord {
  public numOfCalls = 0;
  public args: any[][] = [];
  public returnValue: any;
  public behavior: (...args: any[]) => any;

  public returns(returnValue: any): void {
    this.returnValue = returnValue;
  }

  public throws(exception: Error): void {
    this.behavior = () => {
      throw exception;
    };
  }

  public rejects(exception: Error): void {
    this.behavior = () => {
      return Promise.reject(exception);
    };
  }
}

export class Mock<IInterface> {
  private readonly methods_: Map<string, MethodCallRecord>;

  public readonly instance: IInterface;

  constructor() {
    this.methods_ = new Map();
    this.instance = {} as IInterface;
  }

  public setup(methodName: string, behavior: (...args: any[]) => any = undefined): MethodCallRecord {
    if (this.methods_.has(methodName)) throw Error(`${methodName} has already been set up`);

    this.methods_.set(methodName, new MethodCallRecord());
    this.instance[methodName] = (...args: any[]) => {
      const record = this.methods_.get(methodName);
      record.numOfCalls++;
      record.args.push(args);
      if (!record.behavior) record.behavior = behavior;
      if (record.behavior) record.returns(record.behavior(...args));

      return record.returnValue;
    };

    return this.methods_.get(methodName);
  }

  public verifyCalls(methodName: string, expectedNumOfCalls: number): void {
    if (!this.methods_.has(methodName)) throw new MethodNotSetupException(methodName);

    const record = this.methods_.get(methodName);
    Mock.verifyNumOfCalls(methodName, record, expectedNumOfCalls);
  }

  public verify(methodName: string, expectedNumOfCalls: number, expectedArgs: any[][]): void {
    if (!expectedArgs || expectedNumOfCalls !== expectedArgs.length)
      throw new IncorrectNumOfExpectedArgs(expectedNumOfCalls, expectedArgs.length);

    if (!this.methods_.has(methodName)) throw new MethodNotSetupException(methodName);

    const record = this.methods_.get(methodName);
    Mock.verifyNumOfCalls(methodName, record, expectedNumOfCalls);

    for (let i = 0; i < expectedNumOfCalls; i++) {
      try {
        assert.deepEqual(record.args[i], expectedArgs[i]);
      } catch (ex) {
        throw new IncorrectArgsPassedException(methodName, expectedArgs[i], record.args[i]);
      }
    }
  }

  public verifyOnce(methodName: string, ...args: any[]): void {
    this.verify(methodName, 1, [args]);
  }

  private static verifyNumOfCalls(methodName: string, record: MethodCallRecord, expectedNumOfCalls: number) {
    if (record.numOfCalls !== expectedNumOfCalls)
      throw new MethodNotCalledException(methodName, expectedNumOfCalls, record.numOfCalls);
  }
}
