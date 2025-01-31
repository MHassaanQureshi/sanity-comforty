// schemas/user.js

import { defineType } from "sanity";

export const userSchema = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
  ],
}
)