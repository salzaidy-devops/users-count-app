import { useEffect, useState } from "react";
import { createUser, getUsers, getCount } from "./api";

export default function App() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");

  async function refreshCount() {
    const { count } = await getCount();
    setCount(count);
  }

  useEffect(() => {
    refreshCount();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await createUser(form);
      setForm({ firstName: "", lastName: "", email: "" });
      await refreshCount();
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  async function handleGetAll() {
    setLoadingUsers(true);
    setError("");
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Could not fetch users");
    } finally {
      setLoadingUsers(false);
    }
  }

  return (
    <div className="page">
      <div className="header">React With NodeJS</div>

      <div className="content">
        <section className="form-col">
          <h1 className="title">Create User</h1>

          <form className="form" onSubmit={handleCreate}>
            <div className="row">
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={onChange}
              />
            </div>

            <div className="row">
              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={onChange}
              />
            </div>

            <div className="row">
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={onChange}
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button className="create-btn" type="submit">Create</button>
          </form>
        </section>

        <section className="card">
          <div className="card-title">Users Created</div>
          <div className="big-number">{count}</div>
          <button className="get-btn" onClick={handleGetAll}>
            Get all Users
          </button>

          {users.length > 0 && (
            <div className="list">
              {users.map(u => (
                <div key={u.id} className="user-row">
                  <div>{u.firstName} {u.lastName}</div>
                  <div className="muted">{u.email}</div>
                </div>
              ))}
            </div>
          )}

          {loadingUsers && <div className="muted">Loading…</div>}
        </section>
      </div>
    </div>
  );
}
