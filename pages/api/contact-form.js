const sendInBlueKey = process.env.SEND_IN_BLUE_KEY;

export default async function handler(req, res) {
  const body = req.body;

  const resp = await fetch("https://api.sendinblue.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": sendInBlueKey,
    },
    body: JSON.stringify({
      sender: {
        name: body.name,
        email: body.email,
      },
      to: [
        {
          email: "ayse.stinnett@gmail.com",
          name: "Your Name",
        },
      ],
      subject: `Prismic-ts Contact Form From ${body.name}`,
      htmlContent: `
                <html>
                    <head></head>
                    <body>
                        From: ${body.name} - ${body.email} <br/>
                        Message: ${body.message} <br/>
                    </body>
                </html>
            `,
    }),
  });

  res.status(200).end();
}
