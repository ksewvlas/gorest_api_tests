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

module.exports = {
  cleanupUser,
  generateRandomUserData,
  generateInvalidUserDataWithoutRequiredField,
};
