const BASE = "http://localhost:4000/api";

export async function createUser(payload) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to create user");
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function getCount() {
  const res = await fetch(`${BASE}/users/count`);
  if (!res.ok) throw new Error("Failed to load count");
  return res.json();
}
