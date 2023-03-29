import { useState } from "react";
import { InputField } from "@/components/Contact/InputFields";

export default function OptIn() {
  const [send, setSend] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/opt-in";

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
        <p>Thank you for staying tuned!</p>
      </div>
    );
  } else {
    content = (
      <div className="mx-auto max-w-xl px-4 md: px-6">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address*"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
          />
          <div className="flex basis-2 py-6 w-full gap-10">
            <InputField
              label="First Name"
              name="firstname"
              placeholder="Jane"
              required={false}
            />
            <InputField
              label="Last Name"
              name="lastname"
              placeholder="Doe"
              required={false}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="p-2 rounded hover:shadow-xl hover:bg-canyonClay"
            >
              <span>Subscribe</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <>{content}</>;
}
