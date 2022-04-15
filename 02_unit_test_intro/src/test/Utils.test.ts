import { Utils } from "../app/Utils";

describe("Utils test suite", () => {
  beforeEach(() => {
    console.log("before each");
  });

  beforeAll(() => {
    console.log("before all");
  });

  test("first test", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  test("parse simple URL", () => {
    const parsedUrl = Utils.parseUrl("http://localhost:3050/login");
    expect(parsedUrl.href).toBe("http://localhost:3050/login");
    expect(parsedUrl.port).toBe("3050");
    expect(parsedUrl.protocol).toBe("http:");
    expect(parsedUrl.query).toEqual({});
  });

  test("parse url with query", () => {
    const parsedUrl = Utils.parseUrl(
      "http://localhost:3050/login?user=user&pass=pass"
    );
    const expectedQuery = {
      user: "user",
      pass: "pass",
    };
    expect(parsedUrl.query).toEqual(expectedQuery);
  });

  test("invalid url", () => {
    const expectError = () => {
      Utils.parseUrl("");
    };

    expect(expectError).toThrowError("Empty URL");
  });

  test("invalid url with function", () => {
    function expectError() {
      Utils.parseUrl("");
    }

    expect(expectError).toThrowError("Empty URL");
  });

  test("invalid url with try / catch", () => {
    try {
      Utils.parseUrl("");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toHaveProperty("message", "Empty URL");
    }
  });
});
