import sendgrid from '@sendgrid/mail'
import { env } from 'process'

import {
  WELCOME_TEMPLATE,
  TEST_INVITE_TEMPLATE,
  OTP_TEMPLATE,
  RECRUITER_TEMPLATE,
  NEW_OTP_TEMPLATE,
  MEMBER_INVITE_TEMPLATE,
  sendGridFailed,
} from '~/constants/email.constants'

const callSengridAPI = ({
  to,
  from, // Use the email address or domain you verified above
  subject,
  text,
  html,
}: any) => {
  sendgrid.setApiKey(env.SENDGRID_API_KEY as string)

  const msg = {
    to,
    from, // Use the email address or domain you verified above
    subject,
    text,
    html,
  }
  return sendgrid
    .send(msg)
    .then((res: any) => {
      if (res[0].statusCode === 202) return 'Done'
    })
    .catch((error) => {
      if (error.response) {
        console.error('Sendgrid Error: ', error.response.body)
      }
      throw new Error(sendGridFailed)
    })
}

export async function sendMail(
  passwordGenerationLink: string,
  email: string,
  name: string,
  role: string
) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'Welcome to K - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = WELCOME_TEMPLATE({
    passwordGenerationLink,
    logo,
    name,
    role,
  })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}

export async function sendTestInviteMail(email: string, link: string) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'Welcome to K - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = TEST_INVITE_TEMPLATE({ logo, link })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}

export async function sendOTPMail(email: string, otp: number) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'OTP - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = OTP_TEMPLATE({ logo, otp })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}

export async function sendMailToRecruiter(
  recruiterEmail?: string,
  testName?: string,
  candidateName?: string
) {
  const to = recruiterEmail
  const from = 'careers@copods.co'
  const subject = `${candidateName} has finished the assessment of K - Quiz @ Copods`
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = RECRUITER_TEMPLATE({
    logo,
    candidateName,
    testName,
    PUBLIC_URL: env.PUBLIC_URL,
  })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}

export async function sendNewPassword(email: string, password: string) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'RESET PASSWORD - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = NEW_OTP_TEMPLATE({ logo, password })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}

export async function sendMemberInvite(
  email: string,
  name: string,
  workspaceJoinLink: string
) {
  const to = email
  const from = 'careers@copods.co'
  const subject = 'Welcome to K - Quiz @ Copods'
  const text = 'K - Quiz @ Copods'
  const logo = 'K - Quiz logo'
  const html = MEMBER_INVITE_TEMPLATE({ logo, name, workspaceJoinLink })

  try {
    return await callSengridAPI({
      to,
      from, // Use the email address or domain you verified above
      subject,
      text,
      html,
    })
  } catch (err) {
    throw new Error(sendGridFailed)
  }
}
