import axiosInstance from "./axiosInstance";

export const checkAuthentication = async () => {
  try {
    const response = await axiosInstance.get("/checkAuth");

    return {
      isAuthenticated: response.data.authenticated,
      user: response.data.user,
    };
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
