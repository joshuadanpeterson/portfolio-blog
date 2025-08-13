// src/app/contact/page.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import TitleUpdater from "@/app/_components/title-updater";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      router.push("/contact/success");
    } else {
      // Handle error (e.g., display an error message)
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <>
      <TitleUpdater title="Contact Me | Josh Peterson" />
      <div className="flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Contact Me
        </h1>
        <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
            />
          </div>
          <div className="flex items-center justify-between">
							<Button
              type="submit"
              className="min-w-[6rem] shadow-md hover:shadow-lg transition-shadow"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactPage;
