"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); 
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "A valid email address is required.";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully", formData);
      
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[80%] gap-2 pb-10"
    >
      <label htmlFor="name" className="font-bold">
        Your name
      </label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className={`p-2 border-black border-[1px] ${
          errors.name ? "border-red-500" : "border-opacity-25"
        }`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <label htmlFor="email" className="font-bold">
        Email Address
      </label>
      <input
        type="text"
        id="email"
        value={formData.email}
        onChange={handleChange}
        className={`p-2 border-black border-[1px] ${
          errors.email ? "border-red-500" : "border-opacity-25"
        }`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <label htmlFor="subject" className="font-bold">
        Subject
      </label>
      <input
        type="text"
        id="subject"
        value={formData.subject}
        onChange={handleChange}
        className={`p-2 border-black border-[1px] ${
          errors.subject ? "border-red-500" : "border-opacity-25"
        }`}
      />
      {errors.subject && (
        <p className="text-red-500 text-sm">{errors.subject}</p>
      )}

      <label htmlFor="message" className="font-bold">
        Message
      </label>
      <input
        type="text"
        id="message"
        value={formData.message}
        onChange={handleChange}
        className={`p-2 border-black border-[1px] ${
          errors.message ? "border-red-500" : "border-opacity-25"
        }`}
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message}</p>
      )}

      <button
        type="submit"
        className="bg-[#029FAE] px-8 py-2 text-white text-center md:w-[237px] md:h-[55px]"
      >
        Submit
      </button>
    </form>
  );
}
