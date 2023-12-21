const {
  createUser,
  getUsers,
  getUsersWithPagination,
  getUserById,
} = require("../../../src/utils/api");
const {
  generateRandomUserData,
  cleanupUser,
} = require("../../../src/utils/userUtils");
const { getApiConfig } = require("../../../src/utils/config");

const { validToken, invalidToken } = getApiConfig();
let createdUser;

const testData = [
  { page: 1, perPage: 3 },
  { page: 2, perPage: 5 },
];

describe("Retrieve User - Positive Scenarios", () => {
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

  test("should retrieve user details successfully by userId", async () => {
    const responseGetUser = await getUserById(validToken, createdUser.id);

    expect(responseGetUser.status).toBe(200);
    expect(responseGetUser.body).toMatchObject(createdUser);
  });

  test("should retrieve all users", async () => {
    const responseGetUsers = await getUsers(validToken);

    expect(responseGetUsers.status).toBe(200);
    expect(responseGetUsers.body).toBeInstanceOf(Array);
    expect(responseGetUsers.body.length).toBeGreaterThan(0);
  });

  test.each(testData)(
    "should retrieve paginated users without overlapping on consecutive pages",
    async ({ page, perPage }) => {
      const responseGetUsersForPage = await getUsersWithPagination(
        page,
        perPage,
      );

      expect(responseGetUsersForPage.status).toBe(200);
      expect(Array.isArray(responseGetUsersForPage.body)).toBe(true);
      expect(responseGetUsersForPage.body.length).toBe(perPage);

      const firstPageUserIds = responseGetUsersForPage.body.map(
        (user) => user.id,
      );
      const responseGetUsersForNextPage = await getUsersWithPagination(
        page + 1,
        perPage,
      );

      expect(responseGetUsersForNextPage.status).toBe(200);
      expect(Array.isArray(responseGetUsersForNextPage.body)).toBe(true);
      expect(responseGetUsersForNextPage.body.length).toBe(perPage);

      const secondPageUserIds = responseGetUsersForNextPage.body.map(
        (user) => user.id,
      );
      const overlappingUsers = firstPageUserIds.filter((id) =>
        secondPageUserIds.includes(id),
      );

      expect(overlappingUsers.length).toBe(0);
    },
  );
});

describe("Retrieve User - Negative Scenarios", () => {
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

  test("should fail to retrieve the user with an invalid ID", async () => {
    const responseGetUser = await getUserById(validToken, "invalidUserId");

    expect(responseGetUser.status).toBe(404);
    expect(responseGetUser.body.message).toBe("Resource not found");
  });

  test("should fail to retrieve the user with an invalid token", async () => {
    const responseGetUser = await getUserById(invalidToken, createUser.id);

    expect(responseGetUser.status).toBe(401);
    expect(responseGetUser.body.message).toBe("Invalid token");
  });

  test("should fail to retrieve all users with invalid token", async () => {
    const responseGetUsers = await getUsers(invalidToken, createUser.id);

    expect(responseGetUsers.status).toBe(401);
    expect(responseGetUsers.body.message).toBe("Invalid token");
  });
});
