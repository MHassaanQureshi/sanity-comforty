// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { client } from "@/sanity/lib/client";
type User = {
  username: string
  password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    // Fetch users from Sanity
    const users: User[] = await client.fetch('*[_type == "user"]{username, password}')

    // Check if credentials match
    const user = users.find((user) => user.username === username && user.password === password)

    if (user) {
      return res.status(200).json({ success: true })
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
