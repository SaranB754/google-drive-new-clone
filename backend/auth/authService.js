// backend/auth/authService.js
import { supabase } from "../config/supabase.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// SIGNUP
export const signup = async (email, password) => {
  // Hash password
  const hashed = await hashPassword(password);

  // Insert user into Supabase
  const { data, error } = await supabase
    .from("users")   // make sure your Supabase table is called 'users'
    .insert([{ email, password: hashed }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data; // return the user object
};

// LOGIN
export const login = async (email, password) => {
  // Get user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("User not found");

  // Compare password
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

// LOGOUT (stateless JWT)
export const logout = async () => {
  return true; // JWT logout is handled on frontend
};
