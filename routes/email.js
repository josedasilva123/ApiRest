const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/send", async (req, res) => {
  try {
    const { emailTo, name, whatsapp, message } = req.body;

    if (!emailTo || !name) {
      throw new Error("Desculpe, está faltando algum parâmetro no body.");
    }
    
    //Estruturação da mensagem
    const msg = {
      from: process.env.SENDGRID_MAIL,
      to: emailTo,
      subject: `Formulário Portfolio: ${name} te mandou uma mensagem.`,
      text: `Alguém entrou em contato com você via formulário`,
      html: message + " Whatsapp: " + whatsapp,
    };

    //Envio do e-mail
    await sgMail
      .send(msg)
      .then((response) => {
        res.status(200).send({
          message: "Sua mensagem foi enviada com sucesso!",
          data: response,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(400).send({error: error.message});
  }
});

module.exports = router;