import emailjs from '@emailjs/browser'

export const sendEmail = (
  to_name: string,
  message: string,
  to_email: string
) => {
  return emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    { to_name, to_email, message },
    'YOUR_PRIVATE_KEY'
  )
}
