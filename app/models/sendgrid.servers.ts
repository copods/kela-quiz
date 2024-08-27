import { env } from "process"

// import entire SDK
import AWS from "aws-sdk"

// Configure AWS SDK
// AWS.config.update({
//   accessKeyId: env.SES_ACCESS_KEY_ID,
//   secretAccessKey: env.SES_SECRET_ACCESS_KEY,
//   region: "ap-south-1", // Ensure the region is set correctly
// })

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIA2UC3E3DCDGS3HQGW",
  secretAccessKey: "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",
  region: "ap-south-1", // Ensure the region is set correctly
})

const ses = new AWS.SES({ apiVersion: "2010-12-01" })

function sendEmail({ to, subject, body, bcc }: any) {
  let params = {
    Source: "careers@copods.co", // Ensure this email is verified
    Destination: {
      // ToAddresses: ["patelanurag.0411@gmail.com"],
      ToAddresses: [to],
      BccAddresses: bcc ? [bcc] : [],
    },
    ReplyToAddresses: ["kQuiz @ Copods <careers@copods.co>"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  }

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error("Error sending email:", err)
    } else {
      console.log("Email sent:", data)
    }
  })
}

export async function sendMail(
  passwordGenerationLink: string,
  email: string,
  name: string,
  role: string
) {
  const to = email
  const subject = "Welcome to K - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;padding:15px 0px;text-align:center">
    <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
  </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
    <td style="background-color:#353988;padding-right:20px;padding-left:20px">
            <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome!</span></p></tr>
        </td>
    </tr>
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi ${name},</span>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">You have been added as ${role} on K - Quiz.
          </p>
          <br>

          <p style="text-align:left;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
          Please use below link to create your first password.
          </p>
          <br>
        </div>        
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;margin-top:10px">     
          <a href="${passwordGenerationLink}" style="color: #353988;">${passwordGenerationLink}</a>
        </p>
        <br>
         <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
             Use above link to generate your password
          </p>
      </div>
      </td>
  </tr>
</table>
      
      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
</html>
    `

  sendEmail({ to, subject, body: html })
}

export async function sendTestInviteMail(
  email: string,
  link: string,
  time: string
) {
  const to = email
  const subject = "Welcome to K - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
  <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <div style="background:#353988;padding:15px 0px;text-align:center">
  <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
</div>
<div  style="font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td style="background-color:#353988;padding-right:20px;padding-left:20px">
          <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome!</span></p></tr>
      </td>
  </tr>
      <tr>
    <td align="center">
        <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
      <div style="font-size:16px; line-height:24px;margin-bottom:16px">
        <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span>
        </p>
        <br>
        <p style="text-align:left;color:#4B5563;margin:0;">You have been invited by Copods for an online pre interview assessment of ${time}.
        </p>
        


      </div>
      <div style="text-align:center;padding:10px" >
      <a href="${link}" style="text-decoration:none"><span style="padding: 10px 38px;background:#353988;color:#fff;font-family:'Poppins', sans-serif;">Click here to take the test</span></a>
      </div>
      <br>
      
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
          If the above link does not work, copy and paste this URL into your browser:
        </p>
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;margin-top:10px">
          <a href="${link}" style="color: #353988;">${link}</a>
        </p>
        <br>
    </div>
    </td>
</tr>
</table>

    <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
  </div>
  </body>
</html>
      `
  sendEmail({ to, subject, body: html, bcc: "careers@copods.co" })
}

export async function sendOTPMail(email: string, otp: number) {
  const to = email
  const subject = "OTP - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;padding:15px 0px;text-align:center">
    <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
  </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
    <td style="background-color:#353988;padding-right:20px;padding-left:20px">
            <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome!</span></p></tr>
        </td>
    </tr>
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top:0px;">
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span></p><br>
<p style="text-align:left;color:#4B5563;margin:0;"><span>This mail is sent for verification</span></p>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">Your OTP is <b>${otp}</b>
          </p>
          <br>
<br>
<p style="text-align:left;color:#4B5563;margin:0;"><span>Please enter this OTP to start the K-Quiz test</span></p>
      </div>
      </td>
  </tr>
</table>

      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
  </html>
</html>
      `

  sendEmail({ to, subject, body: html })
}

export async function sendMailToRecruiter(
  recruiterEmail?: string,
  testName?: string,
  candidateName?: string
) {
  const to = recruiterEmail
  const subject = `${candidateName} has finished the assessment of K - Quiz @ Copods`
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;background: url('https://res.cloudinary.com/drpi0krkh/image/upload/v1656596230/User_Invitation_1_he7s2e.png');background-repeat:repeat-x;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;padding:15px 0px;text-align:center">
    <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30"/>
  </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px">
        <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;margin:0;margin-bottom:13px"><span>Welcome!</span></p>
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">Candidate <b>${candidateName}</b> has finished the test <b>${testName}</b>.
          </p>
          


        </div>
       
        <br>
        
          <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">You can check the result on <a href="${env.PUBLIC_URL}" style="color: #353988;">admin panel</a>
          </p>
          <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;margin-top:10px">
           
          </p>
          <br>
      </div>
      </td>
  </tr>
</table>

      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
</html>
      `
  sendEmail({ to, subject, body: html })
}

export async function sendNewPassword(email: string, password: string) {
  const to = email
  const subject = "RESET PASSWORD - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;padding:15px 0px;text-align:center">
    <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
  </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
    <td style="background-color:#353988;padding-right:20px;padding-left:20px">
            <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome!</span></p></tr>
        </td>
    </tr>
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-top:0px;">
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span></p><br>
<p style="text-align:left;color:#4B5563;margin:0;"><span>Your new password has been generated</span></p>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">Your new password is <b>${password}</b>
          </p>
          <br>
<br>
<p style="text-align:left;color:#4B5563;margin:0;"><span>Please enter this password to login</span></p>
      </div>
      </td>
  </tr>
</table>
      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
  </html>
</html>
      `
  sendEmail({ to, subject, body: html })
}

export async function sendMemberInvite(
  email: string,
  name: string,
  workspaceJoinLink: string,
  workspaceName: string
) {
  const to = email
  const subject = "Welcome to K - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
    <div style="background:#353988;padding:15px 0px;text-align:center">
    <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
  </div>
    <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
    <td style="background-color:#353988;padding-right:20px;padding-left:20px">
            <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome !</span></p></tr>
        </td>
    </tr>
  <tr>
      <td align="center" style="padding: 0 20px">
          <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
        <div style="font-size:16px; line-height:24px;margin-bottom:16px">
          <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span>
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;">You have been invited to join <b>${workspaceName}</b> on k-Quiz by ${name}
          </p>
          <br>
          <p style="text-align:left;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
          Please use below link to join workspace
          </p>
          <br>
        </div>        
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;margin-top:10px">     
          <a href=${workspaceJoinLink} style="color: #353988;">${workspaceJoinLink}</a>
        </p>
        <br>
         <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
             Use above link to generate your password
          </p>
      </div>
      </td>
  </tr>
</table>
      
      <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
    </div>
    </div>
  </body>
</html>
    `

  sendEmail({ to, subject, body: html })
}

export async function sendTestFeedbackMail(email: string, link: string) {
  const to = email
  const subject = "Welcome to K - Quiz @ Copods"
  const logo = "K - Quiz logo"
  const html = `<html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
  <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <div style="background:#353988;padding:15px 0px;text-align:center">
  <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
</div>
<div  style="font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td style="background-color:#353988;padding-right:20px;padding-left:20px">
          <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span>Welcome!</span></p></tr>
      </td>
  </tr>
      <tr>
    <td align="center">
        <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
      <div style="font-size:16px; line-height:24px;margin-bottom:16px">
        <p style="text-align:left;color:#4B5563;margin:0;"><span>Hi,</span>
        </p>
        <br>
        <p style="text-align:left;color:#4B5563;margin:0;"> You have Given Assessment, We Would like to know your Feedback.
        </p>
        


      </div>
      <div style="text-align:center;padding:10px" >
      <a href="${link}" style="text-decoration:none"><span style="padding: 10px 38px;background:#353988;color:#fff;font-family:'Poppins', sans-serif;">Click here to Give Feedback</span></a>
      </div>
      <br>
      
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">
          If the above link does not work, copy and paste this URL into your browser:
        </p>
        <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;margin-top:10px">
          <a href="${link}" style="color: #353988;">${link}</a>
        </p>
        <br>
    </div>
    </td>
</tr>
</table>

    <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
  </div>
  </body>
</html>
      `

  sendEmail({ to, subject, body: html })
}

export async function sendTestResponseMail(
  email: string,
  candidateName: string,
  isQualified: boolean
) {
  const to = email
  const subject = isQualified
    ? `Congratulations ${candidateName}!`
    : `Better luck next time ${candidateName}!`
  const logo = "K - Quiz logo"
  const htmlNotQualified = `
  <html>
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
  <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <div style="background:#353988;padding:15px 0px;text-align:center">
  <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
</div>
<div  style="font-family:'Poppins', sans-serif;background-color:#F3F4F6">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
  <td style="background-color:#353988;padding-right:20px;padding-left:20px">
          <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span></span></p></tr>
      </td>
  </tr>
      <tr>
    <td align="center">
        <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
      <div style="font-size:16px; line-height:24px;margin-bottom:16px">
       
        <br>
        <p style="text-align:left;color:#4B5563;margin:0;font-size:18px"><b>
        Better luck next time ${candidateName}!</b> 
        </p>
        <br>
        <p style="text-align:left;color:#4B5563;margin:0;">Your score is below the qualifying percentage.
        </p>
        <br>
        <p style="text-align:left;color:#4B5563;margin:0;">We appreciate your participation, and interest in Copods. If you have any questions, you can reach us at careers@copods.co</p>
        <br/>
        <p style="text-align:left;color:#4B5563;margin:0;">Wishing you the best for your endeavours, and do follow us on 
        <a href="https://www.linkedin.com/company/copods"><img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1707735468/linkedin_j2twnk.png" alt="linekdin" height="24"></a>, 
        <a href="https://www.instagram.com/copods.co"><img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1707735467/instagram_ntkceo.png" alt="instagram" height="24"></a>
         for tracking opportunitieas and possibilities of collaborating in the future.
</p>
      </div>
    </div>
    </td>
</tr>
</table>

    <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
  </div>
  </body>
</html>
      `

  const htmlQualified = `
      <html>
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        </head>
        <body>
        <div style="min-height:200px;font-family:'Poppins', sans-serif;background-color:#F3F4F6">
        <div style="background:#353988;padding:15px 0px;text-align:center">
        <img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1664196350/Logo_1_jhtgxs.png" alt=${logo} height="26" width="30" />
      </div>
      <div  style="font-family:'Poppins', sans-serif;background-color:#F3F4F6">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td style="background-color:#353988;padding-right:20px;padding-left:20px">
                <p style="text-align:center;font-size:20px;line-height:28px;color:#4B5563;background:#fff;margin:0 auto;padding:20px;max-width: 350px;padding-bottom:13px;"><span></span></p></tr>
            </td>
        </tr>
            <tr>
          <td align="center">
              <div style="background:#fff;margin:0 auto;padding:20px;max-width: 350px; padding-top: 0px;">
            <div style="font-size:16px; line-height:24px;margin-bottom:16px">
              <br>
              <p style="text-align:left;color:#4B5563;margin:0;font-size:18px"><b>Congratulations ${candidateName}!</b> 
              </p>
              <br>
              <p style="text-align:left;color:#4B5563;margin:0;"> You have successfully passed the pre-assessment. 
              </p>
              <br>
              <p style="text-align:left;color:#4B5563;margin:0;">Our team will reach out to you shortly for next steps. If you have any questions, you can reach us at careers@copods.co</p>
              <br/>
              <p style="text-align:left;color:#4B5563;margin:0;">Follow us on 
              <a href="https://www.linkedin.com/company/copods"><img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1707735468/linkedin_j2twnk.png" alt="linekdin" height="24"></a>, 
              <a href="https://www.instagram.com/copods.co"><img src="https://res.cloudinary.com/drpi0krkh/image/upload/v1707735467/instagram_ntkceo.png" alt="instagram" height="24"></a>
             
              </p>
            </div> 
          </div>
          </td>
      </tr>
      </table>
          <div style="text-align:center;padding: 20px 20px 24px;font-family:'Poppins', sans-serif;">K - Quiz @ Copods</div>
        </div>
        </body>
      </html>`

  sendEmail({
    to,
    subject,
    body: isQualified ? htmlQualified : htmlNotQualified,
  })
}
