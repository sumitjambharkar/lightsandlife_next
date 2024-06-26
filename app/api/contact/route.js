import { NextResponse } from "next/server";
import Contact from "@/model/Contact";
import connectDatabase from "@/libs/database";
const nodemailer = require("nodemailer");

connectDatabase();

const sendEmailMailer = async ({ name, message, email }) => {
  try {
    const transport = await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sumit.techdeveloper@gmail.com",
        pass: "wbiizcgbwakkbmzo",
      },
    });
    const mailOption = {
      from: "sumit.techdeveloper@gmail.com",
      to: "sumit.techdeveloper@gmail.com",
      subject: "CleanNation Company Is A Professional All Service Provide In All Over India With low Cost.The Customer Is The King And We Are The Servant",
      html: `FullName : ${name}
      Email Id : ${email}, Message : ${message}`,
    };
    transport.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been send -", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export async function POST(request) {
  try {
    const { name, message, email } = await request.json();

    // Assuming you're using Mongoose for MongoDB
    const contact = new Contact({
      name,
      message,
      email,
    });

    // Save contact to the database
    await contact.save();
    sendEmailMailer({ name, message, email });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json("Error saving contact", { status: 500 });
  }
}