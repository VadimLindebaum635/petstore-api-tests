# Test Report — Petstore API Tests

## Overview
This repository contains automated tests for the Swagger Petstore API. I added a new test for the `findByStatus` endpoint and verified the existing pet lifecycle tests.

## Test Scenarios
- **Pet lifecycle (existing tests in `tests/pet.test.js`)**: create (POST /pet), read (GET /pet/:id), update (PUT /pet), delete (DELETE /pet/:id), verify 404 after deletion.
- **Find by status (added `tests/findByStatus.test.js`)**: create two pets with different statuses and verify `GET /pet/findByStatus?status=available` returns the pet with `status=available` and not the one with `status=sold`.

## Endpoints Tested
- `POST /pet` — create pet
- `GET /pet/:id` — retrieve pet by id
- `PUT /pet` — update pet
- `DELETE /pet/:id` — delete pet
- `GET /pet/findByStatus` — find pets by status

## Observations
- The API accepts and returns JSON; axios `validateStatus: null` is used so tests can assert status codes.
- Pet lifecycle tests passed locally when run against `https://petstore.swagger.io/v2` (see run output).
- The `findByStatus` endpoint returns an array of pets; the test locates the created pet by `id` to avoid false positives from existing data on the public service.
## Test run results
- Ran `npm test` (Jest). `tests/findByStatus.test.js` passed. `tests/pet.test.js` had two failing assertions.

Failures observed:
- `GET /pet/:id — returns the updated pet`: after `PUT /pet` the API returned the old name (`"Doggo"`) instead of `"Doggo Updated"`.
- `GET /pet/:id — returns 404 after deletion`: after `DELETE /pet/:id` the subsequent GET returned `200` (pet still present) instead of `404`.

These failures indicate possible eventual-consistency or state isolation issues on the public Swagger Petstore instance (shared public service can be modified by others).

## Issues / Notes
- Because the tests run against the public Swagger Petstore, results may vary if other users modify shared data. Tests use high, unlikely IDs to reduce collisions but can't fully isolate from the public instance.
- For reliable CI testing, consider running a local mock of the Petstore API or using a dedicated test instance.

## Suggested next steps
- Re-run failing tests to confirm reproducibility; add small delays or retries around read-after-write checks if the API is eventually consistent.
- Use a local mock server or dedicated test instance for deterministic CI.


## How to run
Install deps and run tests:

```bash
npm install
npm test
```
