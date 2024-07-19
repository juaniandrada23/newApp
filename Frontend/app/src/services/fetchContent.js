import authService from "./authService";
import { axiosInstance } from "./authService";

export const fetchAdminContent = async (navigate, setUser, setContent) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      throw new Error("No token found");
    }

    setUser(user);
    const response = await axiosInstance.get("/auth/admin", {
      headers: { "x-access-token": token },
    });
    setContent(response.data);
  } catch (error) {
    console.error("Se encontro un erorr:", error);
    setContent("NO AUTORIZADO");
    authService.logout();
    navigate("/login");
  }
};

export const fetchClientContent = async (navigate, setUser, setContent) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    if (!token) {
      throw new Error("No token found");
    }

    setUser(user);
    const response = await axiosInstance.get("/auth/client", {
      headers: { "x-access-token": token },
    });
    setContent(response.data);
  } catch (error) {
    console.error("Error en el cliente:", error);
    setContent("No autorizado!");
    authService.logout();
    localStorage.removeItem("user");
    navigate("/login");
  }
};