import axios from "axios";
const AxiosConfig = axios.create({
  baseURL: "https://todoapp-3d9bf.firebaseio.com",
});

export default AxiosConfig