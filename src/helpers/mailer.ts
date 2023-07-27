import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { ObjectId } from "bson";

type sendEmailProps = {
  email: string;
  emailType: string;
  userId: ObjectId;
};

export async function sendEmail({ email, emailType, userId }: sendEmailProps) {
  try {
    // create a hashed token for email
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 86400000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transportOptions = {
      host: process.env.MAILTRAP_HOST!,
      port: Number(process.env.MAILTRAP_PORT!),
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASSWORD!,
      },
    };

    // Create the transport with the defined options
    const transport = nodemailer.createTransport(transportOptions);

    const mailOptions = {
      from: "demo.app@gmail.com",
      to: email,
      subject: `DEMO APP: ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }`,
      html: `<p>Click <a href="${process.env
        .DOMAIN!}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }. If the link doesn't work, you can manually access verification page by entering it in your browser: <br> ${process
        .env.DOMAIN!}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
