// src/app/contact/page.tsx
"use client";

import { Suspense, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TitleUpdater from "@/app/_components/title-updater";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ContactForm() {
  const searchParams = useSearchParams();
  const inquiryType = searchParams?.get("type");
  const isFreelanceInquiry = inquiryType === "freelance";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: isFreelanceInquiry ? "Freelance project inquiry" : "",
    projectType: isFreelanceInquiry ? "Automation or internal tools" : "",
    timeline: "",
    budgetRange: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
      <div className="flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          Contact Me
        </h1>
        <p className="mt-5 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-left">
          {isFreelanceInquiry
            ? "Tell me what workflow is painful, what tools are involved, and what would count as a useful first win. I am strongest on automation, dashboards, reporting, cleanup scripts, and lightweight internal tools."
            : "Send a note about collaborations, reporting, automation work, or anything else that belongs in this orbit."}
        </p>
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
          <div className="mb-4">
            <Label
              htmlFor="projectType"
              className="mb-2 block text-sm font-medium"
            >
              Project type
            </Label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a project type</option>
              <option value="Google Sheets or Apps Script automation">
                Google Sheets or Apps Script automation
              </option>
              <option value="Dashboard or reporting workflow">
                Dashboard or reporting workflow
              </option>
              <option value="API integration or CRM sync">
                API integration or CRM sync
              </option>
              <option value="Python automation or data cleanup">
                Python automation or data cleanup
              </option>
              <option value="Lightweight internal tool or admin panel">
                Lightweight internal tool or admin panel
              </option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <Label
                htmlFor="timeline"
                className="mb-2 block text-sm font-medium"
              >
                Timeline
              </Label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select timeline</option>
                <option value="This week">This week</option>
                <option value="Next 2-4 weeks">Next 2-4 weeks</option>
                <option value="This quarter">This quarter</option>
                <option value="Exploring options">Exploring options</option>
              </select>
            </div>
            <div className="mb-4">
              <Label
                htmlFor="budgetRange"
                className="mb-2 block text-sm font-medium"
              >
                Budget range
              </Label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select budget</option>
                <option value="Small audit or starter slice">
                  Small audit or starter slice
                </option>
                <option value="$1,000-$3,000">$1,000-$3,000</option>
                <option value="$3,000-$7,500">$3,000-$7,500</option>
                <option value="$7,500+">$7,500+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
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
}

const ContactPage = () => {
  return (
    <>
      <TitleUpdater title="Contact Me | Josh Peterson" />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </>
  );
};

export default ContactPage;
