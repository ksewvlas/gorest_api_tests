const {
  createUser,
  getUserById,
  updateUser,
} = require("../../../src/utils/api");
const {
  generateRandomUserData,
  cleanupUser,
} = require("../../../src/utils/userUtils");
const { getApiConfig } = require("../../../src/utils/config");

const { validToken, invalidToken } = getApiConfig();
let createdUser;

describe("Update User - Positive Scenarios", () => {
  beforeEach(async () => {
    const newUser = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, newUser);
    createdUser = responseCreateUser.body;
  });

  afterEach(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test("should update user details successfully by userId", async () => {
    const updatedUserData = {
      name: "Updated Name",
    };
    const responseUpdateUser = await updateUser(
      validToken,
      createdUser.id,
      updatedUserData,
    );

    expect(responseUpdateUser.status).toBe(200);

    const responseGetUser = await getUserById(validToken, createdUser.id);

    expect(responseGetUser.status).toBe(200);
    expect(responseGetUser.body).toMatchObject(updatedUserData);

    const unchangedFields = ["id", "email", "gender", "status"];
    unchangedFields.forEach((field) => {
      expect(responseGetUser.body[field]).toBe(createdUser[field]);
    });
  });
});

describe("Update User - Negative Scenarios", () => {
  beforeEach(async () => {
    const newUser = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, newUser);
    createdUser = responseCreateUser.body;
  });

  afterEach(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test("should fail to update the user with an invalid ID", async () => {
    const invalidUserId = "invalidUserId";
    const updatedUserData = {
      name: "Updated Name",
    };

    const responseUpdateUser = await updateUser(
      validToken,
      invalidUserId,
      updatedUserData,
    );

    expect(responseUpdateUser.status).toBe(404);
    expect(responseUpdateUser.body.message).toBe("Resource not found");
  });

  test("should fail to update the user with an invalid token", async () => {
    const updatedUserData = {
      name: "Updated Name",
    };

    const responseUpdateUser = await updateUser(
      invalidToken,
      createdUser.id,
      updatedUserData,
    );

    expect(responseUpdateUser.status).toBe(401);
    expect(responseUpdateUser.body.message).toBe("Invalid token");
  });
});
