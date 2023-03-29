const sendInBlueKey = process.env.SEND_IN_BLUE_KEY;

export default async function handler(req, res) {
  const body = req.body;

  const resp = await fetch("https://api.sendinblue.com/v3/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": sendInBlueKey,
    },
    body: JSON.stringify({
      email: body.email,
      attributes: { LASTNAME: body.lastname, FIRSTNAME: body.firstname },
    }),
  });

  res.status(200).end();
}
