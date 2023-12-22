const { deleteUser } = require("./api");
const faker = require("faker");

function generateRandomUserData() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(["male", "female"]),
    status: faker.random.arrayElement(["active", "inactive"]),
  };
}

function generateInvalidUserDataWithoutRequiredField(missingField) {
  const userData = generateRandomUserData();

  delete userData[missingField];

  return userData;
}

async function cleanupUser(userId) {
  await deleteUser(userId);
}

const wait = async (milliseconds) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const waitForSuccessfulResponse = async (
  requestFunction,
  maxAttempts = 5,
  waitTime = 1000,
) => {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const response = await requestFunction();
      if (response.status === 200) {
        return response.body;
      }
    } catch (error) {
      /* empty */
    }
    await wait(waitTime);
    attempt++;
  }
  throw new Error(
    `Maximum attempts (${maxAttempts}) reached without a successful response.`,
  );
};

module.exports = {
  cleanupUser,
  generateRandomUserData,
  generateInvalidUserDataWithoutRequiredField,
  waitForSuccessfulResponse,
  wait,
};
