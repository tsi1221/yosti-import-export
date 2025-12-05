// src/hooks/useRegister.ts
import { useState } from "react";
import { message } from "antd";
import type {RegisterFormValues } from "../pages/interface";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (values: RegisterFormValues) => {
    setLoading(true);

    try {
      console.log("Register Form:", values);

      await new Promise((res) => setTimeout(res, 1000));

      message.success("Registration successful!");
    } catch {
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};
