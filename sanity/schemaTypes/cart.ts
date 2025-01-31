import { defineType } from "sanity";

export const cartSchema = defineType({
  name: "cartItem",
  title: "Cart Item",
  type: "document",
  fields: [
    {
      name: "productId",
      title: "Product ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (Rule) => Rule.min(1).required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0).required(),
    },
    {
      name: "image_url",
      title: "Image URL",
      type: "url",
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
      description: "The ID of the user this cart item belongs to.",
    },
  ],
});
