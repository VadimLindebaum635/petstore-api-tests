# Petstore API Tests
<img width="962" height="407" alt="Screenshot 2026-04-14" src="https://github.com/user-attachments/assets/1efd8fc2-fb59-4175-92d3-b7bc90eb213f" />

Sample API test project for the [Swagger Petstore API](https://petstore.swagger.io).
Automated test scripts along with a brief report documenting your test scenarios.

## Stack

- [Jest](https://jestjs.io) — test runner
- [Axios](https://axios-http.com) — HTTP client

## Setup

```bash
npm install
npm test
```

## What is tested

A single pet lifecycle in order:

1. `POST /pet` — create a pet
2. `GET /pet/:id` — verify it exists
3. `PUT /pet` — update name and status
4. `GET /pet/:id` — verify the update
5. `DELETE /pet/:id` — delete the pet
6. `GET /pet/:id` — verify it returns 404

## Summary
- The objective of this assignment is to familiarize yourself with API testing concepts 
and tools, and to implement automated tests for the Swagger Petstore API. 
- You will demonstrate your ability to handle different HTTP methods (GET, POST, 
PUT, DELETE), query parameters, and path parameters.
- You will choose a suitable test automation framework and create tests that 
cover functional, negative, and edge case scenarios for at least 5 endpoints of the 
API.

## FYI:
- This assignment is a part of an actual take-home task for a QA Engineer position 
within a company, so this is what you can expect to do when applying for QA roles.

## Issue Fail
<img width="1186" height="800" alt="Screenshot 2026-04-14 12" src="https://github.com/user-attachments/assets/0c877da6-348b-43fb-b403-ea6ef22e70c7" />

