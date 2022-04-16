import { Authorizer } from "../../app/Authorization/Authorizer";
import { SessionTokenDBAccess } from "../../app/Authorization/SessionTokenDBAccess";
import { UserCredentialsDbAccess } from "../../app/Authorization/UserCredentialsDbAccess";
import { Account, SessionToken } from "../../app/Models/ServerModels";
// mock module by passing url
jest.mock("../../app/Authorization/SessionTokenDBAccess");
jest.mock("../../app/Authorization/UserCredentialsDbAccess");

describe("Authorizer test suite", () => {
  let authorizer: Authorizer;
  const sessionTokenDBAccessMock = {
    storeSessionToken: jest.fn(),
  };
  const userCredentialsDbAccessMock = {
    getUserCredential: jest.fn(),
  };

  const someAccount: Account = {
    username: "someUser",
    password: "password",
  };

  beforeEach(() => {
    authorizer = new Authorizer(
      sessionTokenDBAccessMock as any,
      userCredentialsDbAccessMock as any
    );
  });

  test("constructor arguments", () => {
    new Authorizer();
    expect(SessionTokenDBAccess).toBeCalled();
    expect(UserCredentialsDbAccess).toBeCalled();
  });

  test("should return session token for valid credentials", async () => {
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0);
    jest.spyOn(global.Date, "now").mockReturnValueOnce(0);

    userCredentialsDbAccessMock.getUserCredential.mockResolvedValueOnce({
      username: "someUser",
      accessRights: [1, 2, 3],
    });

    const expectedSessionToken: SessionToken = {
      userName: "someUser",
      accessRights: [1, 2, 3],
      valid: true,
      tokenId: "",
      expirationTime: new Date(60 * 60 * 1000),
    };

    const sessionToken = await authorizer.generateToken(someAccount);
    expect(expectedSessionToken).toEqual(sessionToken);
    expect(sessionTokenDBAccessMock.storeSessionToken).toBeCalledWith(
      sessionToken
    );
  });
});
