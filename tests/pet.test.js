const client = require("../helpers/client");

const PET_ID = 7000042;

const pet = {
  id: PET_ID,
  name: "Doggo",
  status: "available",
  photoUrls: ["https://example.com/dog.jpg"],
};

describe("Pet lifecycle", () => {
  // Polling helper to wait for a GET to return an expected status (or throw on timeout).
  async function waitForGetStatus(id, expectedStatus, { timeout = 5000, interval = 300 } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const res = await client.get(`/pet/${id}`);
      if (res.status === expectedStatus) return res;
      await new Promise((r) => setTimeout(r, interval));
    }
    // Last attempt to get the response for debugging
    return client.get(`/pet/${id}`);
  }

  // Polling helper that waits until predicate(res) returns true.
  async function waitForGetCondition(id, predicate, { timeout = 7000, interval = 300 } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const res = await client.get(`/pet/${id}`);
      try {
        if (predicate(res)) return res;
      } catch (e) {
        // ignore predicate errors and continue polling
      }
      await new Promise((r) => setTimeout(r, interval));
    }
    return client.get(`/pet/${id}`);
  }

  it("POST /pet — creates a pet", async () => {
    const res = await client.post("/pet", pet);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(PET_ID);
    expect(res.data.name).toBe("Doggo");
  });

  it("GET /pet/:id — returns the created pet", async () => {
    const res = await waitForGetStatus(PET_ID, 200);

    expect(res.status).toBe(200);
    expect(res.data.id).toBe(PET_ID);
    expect(res.data.name).toBe("Doggo");
  });

  it("PUT /pet — updates the pet name and status", async () => {
    const res = await client.put("/pet", { ...pet, name: "Doggo Updated", status: "sold" });

    expect(res.status).toBe(200);
    expect(res.data.name).toBe("Doggo Updated");
    expect(res.data.status).toBe("sold");
  });

  it("GET /pet/:id — returns the updated pet", async () => {
    const res = await waitForGetCondition(
      PET_ID,
      (r) => r.status === 200 && r.data && r.data.name === "Doggo Updated" && r.data.status === "sold",
      { timeout: 8000 }
    );

    expect(res.status).toBe(200);
    expect(res.data.name).toBe("Doggo Updated");
    expect(res.data.status).toBe("sold");
  });

  it("DELETE /pet/:id — deletes the pet", async () => {
    const res = await client.delete(`/pet/${PET_ID}`);

    expect(res.status).toBe(200);
  });

  it("GET /pet/:id — returns 404 after deletion", async () => {
    const res = await waitForGetStatus(PET_ID, 404, { timeout: 7000 });

    expect(res.status).toBe(404);
  });
});
