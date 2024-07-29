import axios from 'axios';

const API_URL = 'https://mysterymapapi.onrender.com/api';

export const createRoom = async (username) => {
  console.log('Creating room with username:', username);
  
  const response = await axios.post(`${API_URL}/rooms`, { username });
  console.log(response.data);
  return response.data;
};

export const joinRoom = async (username, roomCode) => {
  console.log('Joining room with username:', username, 'and room code:', roomCode);
  const response = await axios.post(`${API_URL}/rooms/join`, { username, roomCode });
  return response.data;
};

export const getRoomInfo = async (roomCode) => {
  const response = await axios.get(`${API_URL}/rooms/${roomCode}`);
  return response.data;
};
