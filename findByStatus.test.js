const client = require("../helpers/client");

const ID_AVAILABLE = 9000001;
const ID_SOLD = 9000002;

const petAvailable = {
  id: ID_AVAILABLE,
  name: "FindMe",
  status: "available",
  photoUrls: [],
};

const petSold = {
  id: ID_SOLD,
  name: "SoldPet",
  status: "sold",
  photoUrls: [],
};

describe("Find by status", () => {
  beforeAll(async () => {
    await client.post("/pet", petAvailable);
    await client.post("/pet", petSold);
  });

  afterAll(async () => {
    await client.delete(`/pet/${ID_AVAILABLE}`);
    await client.delete(`/pet/${ID_SOLD}`);
  });

  it("GET /pet/findByStatus — returns pets with requested status", async () => {
    const res = await client.get("/pet/findByStatus", { params: { status: "available" } });

    expect(res.status).toBe(200);
    const ids = Array.isArray(res.data) ? res.data.map((p) => p.id) : [];
    expect(ids).toContain(ID_AVAILABLE);
    expect(ids).not.toContain(ID_SOLD);
  });
});
