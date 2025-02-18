import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface EmailMetaData {
    amount: string;
    type: "credit" | "debit";
    email: string;
    txnId: string;
    balance: string;
}

const configOptions = nodemailer.createTransport({
    secure: true,
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_SENDER_ID,
        pass: process.env.EMAIL_SENDER_PASSWORD
    }
});

export const sendEmail = async ({ amount, type, email, txnId, balance }: EmailMetaData) => {
    const message = `
        <p>Your transaction of <strong>${type}</strong> of Rs. <strong>${amount}</strong> with wallet was successful.</p>
        <p>Transaction ID: <strong>${txnId}</strong></p>
        <p>Current balance in your bank account: <strong>${balance}</strong></p>
        <p>Feel free to delete this email, you scapegoat.</p>
    `;

    try {
        await configOptions.sendMail({
            from: process.env.EMAIL_SENDER_ID,
            to: email,
            subject: `Bear with me while I test my project's email server`,
            html: message
        });

        console.log("Email sent successfully to", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
