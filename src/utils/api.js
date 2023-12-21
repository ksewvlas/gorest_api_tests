const request = require("supertest");
const { getApiConfig } = require("./config");

const { baseUrl } = getApiConfig();

async function createUser(token, userData) {
  return await request(baseUrl)
    .post("/users")
    .set("Authorization", `Bearer ${token}`)
    .send(userData);
}

async function getUsers(token) {
  return await request(baseUrl)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
}

async function getUsersWithPagination(page, perPage) {
  return await request(baseUrl).get(`/users?page=${page}&per_page=${perPage}`);
}

async function getUserById(token, userId) {
  return await request(baseUrl)
    .get(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`);
}

async function updateUser(token, userId, userData) {
  return await request(baseUrl)
    .put(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .send(userData);
}

async function deleteUser(token, userId) {
  return await request(baseUrl)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`);
}

module.exports = {
  createUser,
  getUsers,
  getUsersWithPagination,
  getUserById,
  updateUser,
  deleteUser,
};
