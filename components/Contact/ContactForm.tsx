import { useState } from "react";
import { Bounded } from "@/components/Bounded";
import { InputField, TextareaField } from "@/components/Contact/InputFields";

export default function ContactForm() {
  const [send, setSend] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      message: event.target.message.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/contact-form";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    setSend(true);
  }

  let content;

  if (send) {
    content = (
      <div className="flex justify-center py-12">
        <p>Thank you for contacting me!</p>
      </div>
    );
  } else {
    content = (
      <Bounded size="small">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <InputField label="Name*" name="name" placeholder="Jane Doe" />
          <InputField
            label="Email Address*"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
          />
          <TextareaField
            label="Message*"
            name="message"
            placeholder="Write your message here…"
          />
          <button type="submit">
            <span>Send message</span>
          </button>
        </form>
      </Bounded>
    );
  }

  return <>{content}</>;
}
