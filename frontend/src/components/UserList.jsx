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
    users?.length > 0 && (
      <div className="leader-board">
        <h2>🏆 Leaderboard 🏆</h2>
        <table>
          <thead>
            <tr style={{ background: '#ff6600', color: 'white' }}>
              <th>User ID</th>
              <th>Total Clicks</th>
              <th>Total Score</th>
              <th>Prizes Won</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                style={{
                  background: index % 2 === 0 ? '#f2f2f2' : '#ddd',
                  color: '#000',
                }}
              >
                <td>{user.userId}</td>
                <td>{user.totalClicks}</td>
                <td>{user.totalScore}</td>
                <td>{user.prizesWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default UserList;
