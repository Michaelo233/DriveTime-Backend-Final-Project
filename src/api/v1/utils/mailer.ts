import nodemailer from 'nodemailer';
import { ReceiptData } from '../models/receiptModel';
import fs from 'fs';
import path from 'path';

export const sendPurchaseReceipt = async (data: ReceiptData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const emailHtml = `
    <h1>Purchase Receipt</h1>
    <p>Thank you, <b>${data.customerName}</b>!</p>
    <hr />
    <p><b>Vehicle:</b> ${data.carName}</p>
    <p><b>Vehicle Model:</b> ${data.carModel}</p>
    <p><b>Color:</b> ${data.carColor}</p>
    <p><b>Amount Paid:</b> $${data.amountPaid.toLocaleString()}</p>
    <hr />
    <p>We will contact you shortly for pickup instructions.</p>
  `;

  try {
    await transporter.sendMail({
      from: '"DriveTime Dealership" <no-reply@drivetime.com>',
      to: data.customerEmail,
      subject: `Receipt for your ${data.carModel}`,
      html: emailHtml,
    });

    const timestamp = new Date().toISOString();
    const logEntry = `
--- TRANSACTION LOG ---
Timestamp: ${timestamp}
Customer: ${data.customerName} (${data.customerEmail})
Vehicle: ${data.carName}
Total: $${data.amountPaid.toLocaleString()}
-----------------------
`;

    // console log for the terminal
    console.log(logEntry);

    // File logging logic
    const logDirectory = path.join(__dirname, '../../../logs');
    const logFilePath = path.join(logDirectory, 'transactions.log');

    // Create logs folder if it doesn't exist
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    // Append the entry to the file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error("Failed to write to log file:", err);
        else console.log("Transaction saved to logs/transactions.log");
    });

  } catch (error) {
    console.error("Failed to send receipt email:", error);
  }
};