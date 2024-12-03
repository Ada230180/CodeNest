import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdeqtynudwqohfmisvyn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZXF0eW51ZHdxb2hmbWlzdnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2Mjc5MTcsImV4cCI6MjA0ODIwMzkxN30.H8QKlajELF_Sl4fwzWCnzyL0JbjByYzjad9ee1qI9uc";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      throw new Error("Invalid email or password");
    }
    throw error;
  }
  return data.user;
}; 

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) throw error;

  if (data?.user?.identities?.length === 0) {
    throw new Error("Email already registered");
  }

  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
};

export default supabase;
