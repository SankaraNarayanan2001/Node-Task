const nodemailer=require('nodemailer');

const sendEmail=async (option)=>{
 //CREATE TRANSPORTER

  // const transporter=nodemailer.createTransport({
  // host:process.env.EMAIL_HOST,
  // port:process.env.EMAIL_PORT,
  // auth:{
  //    user: process.env.EMAIL_USER,
  //    pass:process.env.EMAIL_PASS
  // }
  // })
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sankar.novastrid@gmail.com',
      pass: 'gvxhnljcfpbfiugb'
    }
  })

  const emailOptions={
    from: 'sankar.novastrid@gmail.com',
    to:option.Email,
    subject:option.subject,
    html:option.html,

  }

  await transporter.sendMail(emailOptions);


}

module.exports=sendEmail;