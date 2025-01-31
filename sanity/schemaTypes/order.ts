import { defineType } from "sanity";

export const orderSchema = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "shipmentId",
      title: "Shipment ID",
      type: "string",
      validation: (Rule) => Rule.required().error("Shipment ID is required"),
    },
    {
      name: "customer",
      title: "Customer Info",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule) =>
            Rule.required().min(2).error("Customer name is required and must be at least 2 characters"),
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.email().error("Invalid email address"),
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
          validation: (Rule) =>
            Rule.required().regex(/^\d{10,15}$/, {
              name: "phone", // Error name
              invert: false, // Allow only valid numbers
            }).error("Phone number must be 10-15 digits"),
        },
        {
          name: "address",
          title: "Address",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Customer address is required"),
        },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required().error("City is required"),
        },
        {
          name: "postalCode",
          title: "Postal Code",
          type: "string",
          validation: (Rule) =>
            Rule.required().regex(/^\d{4,10}$/, {
              name: "postal code",
              invert: false,
            }).error("Postal code must be 4-10 digits"),
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          validation: (Rule) => Rule.required().error("Country is required"),
        },
      ],
    },
    {
      name: "cart",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "Product ID",
              type: "string",
              validation: (Rule) => Rule.required().error("Product ID is required"),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().error("Product title is required"),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .error("Quantity must be at least 1"),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .min(0)
                  .error("Price must be a positive value"),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one cart item is required"),
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Credit Card", value: "credit_card" },
          { title: "PayPal", value: "paypal" },
          { title: "Cash on Delivery", value: "cod" },
        ],
      },
      validation: (Rule) => Rule.required().error("Payment method is required"),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("Created At is required"),
    },
    {
      name: "estimatedDelivery",
      title: "Estimated Delivery",
      type: "datetime",
      validation: (Rule) =>
        Rule.required()
          .min(new Date().toISOString())
          .error("Estimated delivery must be in the future"),
    },
  ],
});
