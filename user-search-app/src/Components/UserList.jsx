import { useEffect, useState, useMemo } from "react";
import useDebounce from "../Hooks/User";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search input
  const debouncedSearch = useDebounce(search, 500);

  // Fetch all users only once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/users?limit=100");
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter only firstName that STARTS WITH search value
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;  // 👈 show all users initially

    return users.filter((user) =>
      user.firstName
        .toLowerCase()
        .startsWith(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, users]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Search (First Name Only)</h2>

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

      {!loading && debouncedSearch && filteredUsers.length === 0 && (
        <p>No users found</p>
      )}

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
