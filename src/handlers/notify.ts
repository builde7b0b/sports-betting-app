import { APIGatewayProxyHandler } from "aws-lambda";
import twilio from "twilio";

const client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

export const handler: APIGatewayProxyHandler = async (event) => {
  const { phoneNumber, message } = JSON.parse(event.body);

  await client.messages.create({
    body: message,
    from: 'your-twilio-number',
    to: phoneNumber,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Notification sent successfully!' }),
  };
};
