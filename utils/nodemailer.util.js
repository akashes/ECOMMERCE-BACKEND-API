
import nodemailer from 'nodemailer'
//for password reset
//  token should be also in users db.  can be crated using randomString package . 
export const resetPasswordUtil=async(name,email,token)=>{
    console.log('inside resetPassword util')

    try {

      const transporter=  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to:email,
            subject:'For Reset Password',
            html:'<p>Hi '+ name +' , please click here to <a href="http://127.0.0.1:8080/api/user/reset-password?token='+token+'"> Reset </a> your Password. </p> '
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log("Email has been sent :- ", info.response)
            }

        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:'Error in sending email',
        })
        
    }

}