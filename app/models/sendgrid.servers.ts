// import process from 'process'
import sendgrid from '@sendgrid/mail'

export async function sendMail() {
  const to = 'patelanurag.0411@gmail.com'
  const from = 'anurag@copods.co'
  const subject = 'Hello Kela Quiz @ Copods'
  const text = 'Kela Quiz @ Copods'
  const html = `
    
  <html>
  <head>
    <title></title>
  </head>
  <body>
  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">

  <img src="https://res.cloudinary.com/drpi0krkh/image/upload/c_scale,w_134/v1656065336/Logo_jtr0wl.png" width="60" />

  <p>
    Hello ${'Anurag'},
  </p>
  <p>
    Your account for Kela Quiz is created as ${'Recruiter'} with email ${'anurag@copods.co'}.
  </p>
  <p>
    Your Passowrd for login is: <span style="color:blue;background:yellow;font-size:18px">ABC#$12</span>
  </p>

  <h2>Welcome at Copods</h2>
  <p style="font-size:12px; line-height:20px;">
    <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
      Kela Quiz @ Copods
    </a>
    <!---
    <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
      To join click <u style="color:red;cursor:pointer">Link</u>
    </a>-->
  </p>
</div>
  </body>
</html>

    `

  const SENDGRID_API_KEY =
    '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'

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
      return 'okok'
    },
    (error: any) => {
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
  //   } catch (error: any) {
  //     console.error('err3: ', error)

  //     if (error.response) {
  //       console.error('err4: ', error.response.body)
  //     }
  //   }
  // })()

  return 'Done'
}
