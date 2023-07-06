import { io } from "socket.io-client";

var socket = io("https://backend-pg-production.up.railway.app/");

export default socket;