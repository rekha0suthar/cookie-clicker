import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://cookie-clicker-ashen.vercel.app/api/stats')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users]);

  return (
    users.length > 0 && (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>🏆 Leaderboard 🏆</h2>
        <table
          style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr style={{ background: '#ff6600', color: 'white' }}>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>
                User ID
              </th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>
                Total Clicks
              </th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>
                Total Score
              </th>
              <th style={{ padding: '10px', borderBottom: '2px solid white' }}>
                Prizes Won
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                style={{
                  background: index % 2 === 0 ? '#f2f2f2' : '#ddd',
                  color: '#000',
                }}
              >
                <td style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                  {user.userId}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                  {user.totalClicks}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                  {user.totalScore}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                  {user.prizesWon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserList;
