import axiosInstance from "./axiosInstance";

export const checkAuthentication = async () => {
  try {
    const response = await axiosInstance.get("/checkAuth");
    return response.data.authenticated;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
