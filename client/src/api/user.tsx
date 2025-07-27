import type { User } from "@/types/IUser";
import axios from "axios";

export const fetchUsers = async (): Promise<User[]> => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await axios.get<User[]>(url);
  return response.data;
};

export const fetchUser = async (id: string): Promise<User[]> => {
  const url = "https://jsonplaceholder.typicode.com/users/" + id;
  const response = await axios.get<User[]>(url);
  return response.data;
};
