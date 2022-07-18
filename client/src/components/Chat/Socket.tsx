import { io } from "socket.io-client";

const socket = io('http://192.168.1.190:8080');
export default socket;