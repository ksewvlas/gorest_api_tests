# E2E Test Scenarios for GoRest service

This repository contains e2e (end-to-end) test scenarios for CRUD (Create, Read, Update, Delete) user operations using API Version 2 and HTTP Bearer Token authentication from the [GoRest](https://gorest.co.in/) service. 
These tests are implemented using Jest and Supertest.

## Prerequisites

Before running the tests, ensure that the following prerequisites are installed:

- **Node.js:** [Download and Install Node.js](https://nodejs.org/)
- **NPM:** Included with Node.js installation

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ksewvlas/gorest_api_tests.git
   cd gorest_api_tests/

2. Install Dependencies:
   ```bash
   npm install

3. Generate Token for external API:
   - Open the URL "https://gorest.co.in/" -> Login / SignUp
   - Click on Login user drop down -> API Tokens
   - Generate new token
   - Copy your token


4. Replace Token in Configuration:
   - Open the *gorest_api_tests/src/utils/config.js* file in your text editor (IDE).
   - Locate the **validToken** and replace it with the actual access token you generated in step 3.


5. Run all tests:
   ```bash
   npm run test:e2e

6. Viewing test report: 

   After running the tests, detailed test report is available in the *gorest_api_tests/test_results* directory.



## Test Scenarios

| Scenario                           | Description                                                            |
|------------------------------------|------------------------------------------------------------------------|
| **Create User**                    | Test scenarios for creating a user and validating successful creation. |
| **Retrieve User**                  | Test scenarios for retrieving user details and user lists.             |
| **Update User**                    | Test scenarios for updating user details.                              |
| **Delete User**                    | Test scenarios for deleting a user.                                    |


### Create User - Positive Scenarios
| Test Case                                                    | Description                                                            |
|--------------------------------------------------------------|------------------------------------------------------------------------|
| should create a user successfully using correct credentials  | Creates a user with valid data and validates the successful creation.  |


### Create User - Negative Scenarios
| Test Case                                                  | Description                                                                                         |
|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| should fail to create a user without a required field      | Attempts to create a user without a required field and validates the expected failure.              |
| should fail to create a user with invalid token            | Attempts to create a user with an invalid token and validates the expected failure.                  |
| should fail to create a duplicated user with the same data | Attempts to create a user with the same data as an existing user and validates the expected failure. |


### Retrieve User - Positive Scenarios
| Test Case                                                                | Description                                                                            |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| should retrieve user details successfully by userId                      | Retrieves user details successfully by the provided userId and validates the response. |
| should retrieve all users                                                | Retrieves all users successfully and validates the response                            |
| should retrieve paginated users without overlapping on consecutive pages | Retrieves paginated users without overlapping on consecutive pages.                    |

### Retrieve User - Negative Scenarios

| Test Case                                              | Description                                                                              |
|--------------------------------------------------------|------------------------------------------------------------------------------------------|
| should fail to retrieve the user with an invalid ID    | Attempts to retrieve a user with an invalid ID and validates the expected failure.       |
| should fail to retrieve the user with an invalid token | Attempts to retrieve a user with an invalid token and validates the expected failure.    |
| should fail to retrieve all users with invalid token   | Attempts to retrieve all users with an invalid token and validates the expected failure. |


### Update User - Positive Scenarios
| Test Case                                          | Description                                       |
|----------------------------------------------------|---------------------------------------------------|
| should update user details successfully by userId  | Updates user details and validates the response.  |

### Update User - Negative Scenarios
| Test Case                                             | Description                                                                         |
|-------------------------------------------------------|-------------------------------------------------------------------------------------|
| should fail to update the user with an invalid ID     | Attempts to update a user with an invalid ID and validates the expected failure.    |
| should fail to update the user with an invalid token  | Attempts to update a user with an invalid token and validates the expected failure. |


### Delete User - Positive Scenarios
| Test Case                                  | Description                                           |
|--------------------------------------------| ----------------------------------------------------- |
| should delete user successfully by userId  | Deletes a user and validates the successful deletion. |

### Delete User - Negative Scenarios
| Test Case                                             | Description                                                                         |
|-------------------------------------------------------|-------------------------------------------------------------------------------------|
| should fail to delete the user with an invalid ID     | Attempts to delete a user with an invalid ID and validates the expected failure.    |
| should fail to delete the user with an invalid token  | Attempts to delete a user with an invalid token and validates the expected failure. |
