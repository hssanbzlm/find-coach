import emailjs from '@emailjs/browser'

export const sendEmail = (
  to_name: string,
  message: string,
  to_email: string
) => {
  return emailjs.send(
    import.meta.env.VITE_EMAIL_SERVICE_ID,
    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    { to_name, to_email, message },
    import.meta.env.VITE_EMAIL_PUBLIC_KEY
  )
}
