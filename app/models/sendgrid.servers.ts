import sendgrid from "@sendgrid/mail";
import { env } from "process";

export async function sendMail(
  email: string,
  name: string,
  password: string,
  role: string
) {
  const to = email;
  const from = "careers@copods.co";
  const subject = "Welcome to K - Quiz @ Copods";
  const text = "K - Quiz @ Copods";

  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;background: url('https://res.cloudinary.com/drpi0krkh/image/upload/v1656596230/User_Invitation_1_he7s2e.png');background-repeat:repeat-x;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;height:50px;text-align:center">
      <img src="https://res.cloudinary.com/drpi0krkh/image/upload/c_scale,h_200/v1656065336/Logo_jtr0wl.png" height="48" />
    </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px">
        <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;margin:0;margin-bottom:13px"><span>Welcome !</span></p>
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi ${name},</span>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">You have been added as ${role} on K - Quiz.
          </p>
          <br>

          <p style="text-align:left;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
            Please use the following credentials to access your account
          </p>
          <br>
          
          <p style="text-align:left;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
            Email: <span style="font-weight:600">${email}</span>
          </p>
          <p style="text-align:left;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
            Password: <span style="font-weight:600">${password}</span>
          </p>
          
        </div>
        <div style="text-align:center;padding:10px" >
        <a href="${env.PUBLIC_URL}" style="text-decoration:none"><span style="padding: 10px 38px;background:#353988;color:#fff;font-family:'Poppins', sans-serif;">Head to K - Quiz</span></a>
        </div>
      </div>
      </td>
  </tr>
</table>
      
      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
</html>
    `;

  sendgrid.setApiKey(env.SENDGRID_API_KEY as string);

  const msg = {
    to,
    from, // Use the email address or domain you verified above
    subject,
    text,
    html,
  };
  await sendgrid.send(msg).then(
    () => {
      return "ok";
    },
    (error) => {
      if (error.response) {
        console.error("Sendgrid Error: ", error.response.body);
      }
    }
  );

  return "Done";
}
