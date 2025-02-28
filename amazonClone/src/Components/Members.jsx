import { useState ,useEffect} from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Members = () => {
    const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-789-1230" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "321-654-9870" },
    { id: 5, name: "Charlie White", email: "charlie@example.com", phone: "789-123-4560" },
  ]);


  
  useEffect(() => {

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/login");
    }

  }, [navigate]);






  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">User List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="py-3 px-6 border">ID</th>
              <th className="py-3 px-6 border text-left">Name</th>
              <th className="py-3 px-6 border text-left">Email</th>
              <th className="py-3 px-6 border text-left">Phone No</th>
              <th className="py-3 px-6 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`text-gray-800 text-sm ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-all`}
              >
                <td className="py-4 px-6 text-center border">{user.id}</td>
                <td className="py-4 px-6 border">{user.name}</td>
                <td className="py-4 px-6 border">{user.email}</td>
                <td className="py-4 px-6 border">{user.phone}</td>
                <td className="py-4 px-6 text-center border">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
