const sgMail = require('@sendgrid/mail')

exports.sendemail = (req,res,next) => {
    //sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    sgMail.setApiKey("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")

const {toEmail, content} = req.body;
console.log("toEmail",toEmail)
//const toEmail_ = "khiem.nguyen20tc@hcmut.edu.vn";

const msg = {
  to: toEmail, // Change to your recipient
  from: 'blacksecret0998@gmail.com', // Change to your verified sender
  subject: '[Ecommerce] Marketing Email',
  //text: 'This is email to test sendEmail feature heheheheh',
  //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  html: `
  <div>
  <p>Email: Your email is ${toEmail}</p>
  <p>Content: Ecommerce System send you information marketing: ${content} </p>
</div>`,
}

sgMail
  .sendMultiple(msg)
  .then((res) => {
    console.log(res[0].statusCode)
    console.log(res[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })

  res.status(200).json({
    message: `Sent Email to ${toEmail}`
  })
}