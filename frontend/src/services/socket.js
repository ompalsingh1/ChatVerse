import { io } from "socket.io-client";

const socket = io("https://chatverse-lt2x.onrender.com");

export default socket;