import twilio from "twilio";

const twilioAccount = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthtoken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_SMS_NUMBER;
const destinationNummber = process.env.TWILIO_TO_SMS_NUMBER;

const twilioClient = twilio(twilioAccount, twilioAuthtoken);

const twilioData = {
  body: "Esto es un mensaje de prueba usando Twilio desde NODEJS",
  from: twilioNumber,
  to: destinationNummber,
};

export const sendSMS = async (req, res) => {
  try {
    console.log("Sending SMS using Twilio Account");
    console.log(twilioClient);
    const result = await twilioClient.messages.create({ ...twilioData });
    res.send({ Status: "Success", Payload: result });
  } catch (error) {
    console.log("Hubo un error al enviar el SMS:", error);
    res.status(500).send({ error: error });
  }
};
