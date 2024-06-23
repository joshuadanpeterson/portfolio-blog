// src/app/_components/contact.tsx
"use client";

import { FC } from "react";

const Contact: FC = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
