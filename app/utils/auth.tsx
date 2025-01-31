// utils/auth.ts
import { client } from "@/sanity/lib/client";

interface User {
  name: string
  email: string
  password: string
}

// Define a function that authenticates a user based on email and password
export async function authenticateUser(email: string, password: string): Promise<boolean> {
  const query = `*[_type == "user" && email == $email && password == $password]`
  const params = { email, password }

  // Fetch the user based on the email and password
  const user: User[] = await client.fetch(query, params)

  // Return true if user exists and credentials match, else false
  return user.length > 0
}
