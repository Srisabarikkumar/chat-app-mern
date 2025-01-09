import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
        const response = await axiosInstance.get(`/message/${userId}`);
        set({ messages: response.data });
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
    } finally {
        set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
       const response = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData, {
        withCredentials: true
       });
       set({ messages: [...messages, response.data] }); 
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser })
}));