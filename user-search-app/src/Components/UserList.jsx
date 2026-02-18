import { useEffect, useState } from "react";
import useDebounce from "../Hooks/User";


const UserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://dummyjson.com/users/search?q=${debouncedSearch}`
        );
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Search</h2>

      <input
        type="text"
        placeholder="Search by first name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      {loading && <p>Loading...</p>}

      {!loading && users.length === 0 && <p>No users found</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
