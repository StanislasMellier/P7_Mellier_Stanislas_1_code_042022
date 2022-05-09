import axios from 'axios';

const Api = axios.create({
	baseURL: process.env.REACT_APP_MY_API_URL,
});
export default Api;
