import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Complaint } from "../models/Complaint";

export const submitComplaint = async (
  description: string
): Promise<Complaint> => {
  const response = await axios.post(`${API_BASE_URL}/complaints`, {
    description,
  });

  return response.data;
};
