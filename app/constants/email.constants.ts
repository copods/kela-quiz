export const WELCOME_TEMPLATE = ({
  passwordGenerationLink,
  logo,
  name,
  role,
}: {
  passwordGenerationLink: string
  name: string
  role: string
  logo: string
}) => {
  return `<html>
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
}

export const TEST_INVITE_TEMPLATE = ({
  logo,
  link,
}: {
  logo: string
  link: string
}) => {
  return `<html>
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
        <p style="text-align:left;color:#4B5563;margin:0;">You have been invited by Copods for an online pre interview assessment test.
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
          <a href="${link}" style="color: #353988;">"${link}"</a>
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
}

export const OTP_TEMPLATE = ({ logo, otp }: { logo: string; otp: number }) => {
  return `<html>
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
}

export const RECRUITER_TEMPLATE = ({
  logo,
  candidateName,
  testName,
  PUBLIC_URL,
}: {
  logo: string
  candidateName?: string
  testName?: string
  PUBLIC_URL?: string
}) => {
  return `<html>
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
        
          <p style="text-align:center;color:#4B5563;margin:0;font-family:'Poppins', sans-serif;">You can check the result on <a href="${PUBLIC_URL}" style="color: #353988;">admin panel</a>
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
}

export const NEW_OTP_TEMPLATE = ({
  logo,
  password,
}: {
  logo: string
  password: string
}) => {
  return `<html>
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
}

export const MEMBER_INVITE_TEMPLATE = ({
  logo,
  name,
  workspaceJoinLink,
}: {
  logo: string
  name: string
  workspaceJoinLink: string
}) => {
  return `<html>
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
          <p style="text-align:left;color:#4B5563;margin:0;">You have been invited to join k-Quiz by ${name}
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
}
