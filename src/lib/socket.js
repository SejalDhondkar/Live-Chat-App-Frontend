import { io } from "socket.io-client";

const APP_URL = import.meta.env.VITE_APP_URL

export const socket = io(APP_URL);