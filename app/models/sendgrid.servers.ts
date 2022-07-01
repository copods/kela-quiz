// import process from 'process'
import sendgrid from '@sendgrid/mail'
import { env } from 'process'

export async function sendMail(
  email: string,
  name: string,
  password: string,
  role: string
) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'Welcome to K - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'

  const html = `<html>
  <body>
    <div style="min-height:200px;background: url('https://res.cloudinary.com/drpi0krkh/image/upload/v1656596230/User_Invitation_1_he7s2e.png');background-repeat:repeat-x;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;height:50px;text-align:center">
      <img src="https://res.cloudinary.com/drpi0krkh/image/upload/c_scale,h_200/v1656065336/Logo_jtr0wl.png" height="48" />
    </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 320px">
        <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;margin:0;margin-bottom:13px"><span>Welcome !</span></p>
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hey ${name},</span>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">You have been added as a ${role} on K - Quiz.
          </p>
          <br>

          <p style="text-align:left;color:#4B5563;margin:0;">
            Please use the following credentials to access your account
          </p>
          <br>
          
          <p style="text-align:left;color:#4B5563;margin:0;">
            Email: <span style="font-weight:600">${email}</span>
          </p>
          <p style="text-align:left;color:#4B5563;margin:0;">
            Password: <span style="font-weight:600">${password}</span>
          </p>
          
        </div>
        <div style="text-align:center;padding:10px" >
        <a href="${env.PUBLIC_URL}" style="text-decoration:none"><span style="padding: 10px 38px;background:#353988;color:#fff">Head to K - Quiz</span></a>
        </div>
      </div>
      </td>
  </tr>
</table>
      
      <div style="text-align:center;padding: 20px 20px 24px">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
</html>
    `

  const SENDGRID_API_KEY = env.SENDGRID_API_KEY || 'NULL'

  // const sgMail = require('@sendgrid/mail')

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  sendgrid.setApiKey(SENDGRID_API_KEY)

  const msg = {
    to,
    from, // Use the email address or domain you verified above
    subject,
    text,
    html,
  }
  // console.log('SG: ', sendgrid.send(msg))
  //ES6
  await sendgrid.send(msg).then(
    () => {
      console.log('send successful')
      return 'ok'
    },
    (error) => {
      console.error('err: ', error)

      if (error.response) {
        console.error('err2: ', error.response.body)
      }
    }
  )
  //ES8
  // ;(async () => {
  //   try {
  //     await sendgrid.send(msg)
  //   } catch (error) {
  //     console.error('err3: ', error)

  //     if (error.response) {
  //       console.error('err4: ', error.response.body)
  //     }
  //   }
  // })()

  return 'Done'
}
