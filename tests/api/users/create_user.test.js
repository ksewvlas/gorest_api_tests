const { createUser, getUserById } = require("../../../src/utils/api");
const {
  generateRandomUserData,
  generateInvalidUserDataWithoutRequiredField,
  cleanupUser,
} = require("../../../src/utils/userUtils");
const { getApiConfig } = require("../../../src/utils/config");

const { validToken, invalidToken } = getApiConfig();
const requiredFields = ["name", "email", "gender", "status"];
let createdUser;

describe("Create User - Positive Scenarios", () => {
  afterEach(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test("should create a user successfully using correct credentials", async () => {
    const userData = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, userData);
    createdUser = responseCreateUser.body;

    expect(responseCreateUser.status).toBe(201);
    expect(createdUser).toMatchObject(userData);

    const responseGetUser = await getUserById(validToken, createdUser.id);

    expect(responseGetUser.status).toBe(200);
    expect(responseGetUser.body).toMatchObject(userData);
  });
});

describe("Create User - Negative Scenarios", () => {
  afterAll(async () => {
    if (createdUser.id) {
      await cleanupUser(createdUser.id);
    }
  });

  test.each(requiredFields)(
    "should fail to create a user without a required field (%s)",
    async (missingField) => {
      const invalidUserData =
        generateInvalidUserDataWithoutRequiredField(missingField);
      const responseCreateUser = await createUser(validToken, invalidUserData);

      expect(responseCreateUser.status).toBe(422);
      expect(responseCreateUser.body[0].message).toContain("can't be blank");
    },
  );

  test("should fail to create a user with invalid token", async () => {
    const userData = generateRandomUserData();
    const responseCreateUser = await createUser(invalidToken, userData);

    expect(responseCreateUser.status).toBe(401);
    expect(responseCreateUser.body.message).toBe("Invalid token");
  });

  test("should fail to create a duplicated user with the same data", async () => {
    const userData = generateRandomUserData();
    const responseCreateUser = await createUser(validToken, userData);
    createdUser = responseCreateUser.body;

    const responseCreateDuplicatedUser = await createUser(validToken, userData);

    expect(responseCreateDuplicatedUser.status).toBe(422);
    expect(responseCreateDuplicatedUser.body[0].message).toBe(
      "has already been taken",
    );
  });
});
