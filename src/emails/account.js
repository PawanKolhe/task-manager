const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'contact@pawankolhe.com',
    subject: 'Welcome to Task Manager',
    text: `Welcome to the Task Manager app, ${name}. Hope you have fun using it!`
  });
}

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'contact@pawankolhe.com',
    subject: 'Welcome to Task Manager',
    text: `Goodbye ${name}. Sad to see you go.`
  });
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
