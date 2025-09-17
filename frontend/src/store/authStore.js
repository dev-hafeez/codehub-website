// src/store/authStore.js
import { create } from "zustand";
import axiosInstance from "../axios"; //  use axios.js

const useAuthStore = create((set, get) => ({
  user_id: localStorage.getItem("user_id")||null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  resetToken: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/login/", {
        username,
        password,
      });

      const token = res.data?.token || res.data?.data?.token;
      const role = res.data?.role || res.data?.data?.role;
      const user_id = res.data?.user || res.data?.data?.user_id;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      set({ user_id, token, role, loading: false });
      return true;
    } catch (err) {
      const apiError = err.response?.data;
      let errorMessage = "Login failed";

      if (apiError) {
        if (apiError.non_field_errors) {
          errorMessage = apiError.non_field_errors.join(", ");
        } else if (apiError.detail) {
          errorMessage = apiError.detail;
        } else if (typeof apiError === "string") {
          errorMessage = apiError;
        } else {
          errorMessage = JSON.stringify(apiError);
        }
      }

      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  requestOtp: async (email) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/otp/", { email });

      const resetToken = res.data?.token?.access;
      set({ resetToken, loading: false });

      return { success: true, resetToken };
    } catch (err) {
      const apiError = err.response?.data;
      let errorMessage = "OTP request failed";

      if (apiError?.non_field_errors) {
        errorMessage = apiError.non_field_errors.join(", ");
      }

      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  resetPassword: async (newPassword) => {
    set({ loading: true, error: null });
    try {
      const { resetToken } = get();
      const res = await axiosInstance.put("/auth/password/reset", {
        token: resetToken,
        password: newPassword,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      set({
        loading: false,
        resetToken: null,
        token: null,
        user_id: null,
        role: null,
      });

      return { success: true, data: res.data };
    } catch (err) {
      const apiError = err.response?.data;
      let errorMessage = "Password reset failed";

      if (apiError?.non_field_errors) {
        errorMessage = apiError.non_field_errors.join(", ");
      }

      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signup: async (signupData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/signup/", signupData);

      const newUserToken = res.data?.data?.token;
      const newUserRole = res.data?.data?.role;
      const newUserId = res.data?.data?.user_id;

      console.log("Signup success:", res.data);

      set({ loading: false });
      return {
        success: true,
        data: { token: newUserToken, role: newUserRole, user_id: newUserId },
      };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        loading: false,
      });
      return { success: false, error: err.response?.data?.message };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ role: null, token: null, user_id: null });
  },
}));

export default useAuthStore;