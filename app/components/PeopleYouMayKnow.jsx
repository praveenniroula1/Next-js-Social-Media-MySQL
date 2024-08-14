import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgProfile } from 'react-icons/cg';

const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/peopleyoumayknow');
        if (response.data.status === 'success') {
          setUsers(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    try {
      console.log(id)
      const response = await axios.post('http://localhost:3000/api/peopleyoumayknow', {
        requestReceiverId: id
      });
  
      if (response.data.status === 'success') {
        console.log("Follow request sent successfully:", response.data.message);
        // Update the UI to reflect the follow action
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (err) {
      console.error('Failed to follow user:', err.response ? err.response.data : err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="people-you-may-know bg-white p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">People You May Know</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="user-card flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
          >
            <div className="flex items-center space-x-4">
              <CgProfile className="text-4xl text-gray-500" />
              <p className="text-lg font-medium text-gray-700">{user.name}</p>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleYouMayKnow;
