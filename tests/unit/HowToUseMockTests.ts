import { Mock } from "tests/helpers/Mock";

interface IToMock {
  behavior(): number;
  asyncBehavior(): Promise<number>;
}

class ToTest {
  private readonly m_: IToMock;

  constructor(mock: IToMock) {
    this.m_ = mock;
  }

  public callBehavior(): number {
    return this.m_.behavior();
  }

  public async callAsyncBehavior(): Promise<number> {
    const num = await this.m_.asyncBehavior();
    return num;
  }

  public returnPromiseDirectly(): Promise<number> {
    return this.m_.asyncBehavior();
  }
}

describe("How to use Mock", () => {
  it("how to use throws", () => {
    const mock = new Mock<IToMock>();
    mock.setup("behavior").throws(new Error("Error!"));
    const toTest = new ToTest(mock.instance);

    expect(() => toTest.callBehavior()).toThrow("Error!");
  });

  it("how to use throws for async methods", () => {
    const mock = new Mock<IToMock>();
    mock.setup("asyncBehavior").throws(new Error("Error!"));
    const toTest = new ToTest(mock.instance);

    expect(toTest.callAsyncBehavior()).rejects.toEqual(new Error("Error!"));
  });

  it("how to use rejects", () => {
    const mock = new Mock<IToMock>();
    mock.setup("asyncBehavior").rejects(new Error("Error!"));
    const toTest = new ToTest(mock.instance);

    expect(toTest.returnPromiseDirectly()).rejects.toEqual(new Error("Error!"));
  });
});
