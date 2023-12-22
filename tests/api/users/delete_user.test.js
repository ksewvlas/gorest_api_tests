const {
  createUser,
  getUserById,
  deleteUser,
  getUsers,
} = require("../../../src/utils/api");
const {
  generateRandomUserData,
  cleanupUser,
  waitForSuccessfulResponse,
} = require("../../../src/utils/userUtils");
const { getApiConfig } = require("../../../src/utils/config");

const { validToken, invalidToken } = getApiConfig();
let createdUser;

describe("Delete User - Positive Scenarios", () => {
  beforeEach(async () => {
    const newUser = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, newUser);
    createdUser = responseCreateUser.body;

    await waitForSuccessfulResponse(() => getUsers(validToken));
  });

  afterEach(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test("should delete user successfully by userId", async () => {
    const responseDeleteUser = await deleteUser(validToken, createdUser.id);

    expect(responseDeleteUser.status).toBe(204);

    const responseGetUser = await getUserById(validToken, createdUser.id);

    expect(responseGetUser.status).toBe(404);
    expect(responseGetUser.body.message).toBe("Resource not found");
  });
});

describe("Delete User - Negative Scenarios", () => {
  beforeEach(async () => {
    const newUser = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, newUser);
    createdUser = responseCreateUser.body;

    await waitForSuccessfulResponse(() => getUsers(validToken));
  });

  afterEach(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test("should fail to delete the user with an invalid ID", async () => {
    const invalidUserId = "invalidUserId";
    const responseDeleteUser = await deleteUser(validToken, invalidUserId);

    expect(responseDeleteUser.status).toBe(404);
    expect(responseDeleteUser.body.message).toBe("Resource not found");
  });

  test("should fail to delete the user with an invalid token", async () => {
    const responseDeleteUser = await deleteUser(invalidToken, createdUser.id);

    expect(responseDeleteUser.status).toBe(401);
    expect(responseDeleteUser.body.message).toBe("Invalid token");
  });
});
