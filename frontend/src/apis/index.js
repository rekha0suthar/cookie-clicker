import axios from 'axios';
const BASE_API_URI = 'https://cookie-clicker-ashen.vercel.app/api';

// API to fetch stats of single/current user
const fetchUserStats = async (storedUserId) => {
  try {
    const { data } = axios.get(`${BASE_API_URI}/stats/${storedUserId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// API to update clicks
const updateClick = async (userId) => {
  try {
    const res = await axios.post(`${BASE_API_URI}/click`, { userId });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//API to fetch ALL users stats
const fetchUsersStats = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URI}/stats`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export { fetchUserStats, updateClick, fetchUsersStats };
