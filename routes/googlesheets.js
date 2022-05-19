const router = require("express").Router();
const { google } = require("googleapis");

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = process.env.SPREADSHEET_ID;

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

//Metadata
router.get("/meta", async (req, res) => {
  try {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
    res.status(200).send(metadata.data);
  } catch (error) {
    res.status(400).send({ error: error.message }); 
  }
});

//getCollection
router.get("/rows/:collection", async (req, res) => {
  try {
    const { collection } = req.params;

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: collection,
      valueRenderOption: "UNFORMATTED_VALUE",
      dateTimeRenderOption: "FORMATTED_STRING",
    });

    //Caso getRows for indefinido
    if (!getRows){
      throw new Error("Desculpe, nenhuma coleção foi encontrada.");
    }

    res.status(200).send(getRows.data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/rows", async (req, res) => {
  try {
    const { text, name, collection } = req.body;

    if(!text || !name || !collection){
      throw new Error("Desculpe, está faltando algum parâmetro no body.")
    }

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const values = [
      [
        text,
        name,
        'no',
      ]
    ]
    const requestBody = {
      values,
    }
    //New row
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: collection, 
      valueInputOption: "USER_ENTERED",
      requestBody,
    })

    res.status(200).send({ message: "Linha inserida com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: error.message });  
  }
});

router.put("/rows", async (req, res) => {
  try {
    const { text, name, index, collection } = req.body;

    if(!text || !name || !index || !collection){
      throw new Error("Desculpe, está faltando algum parâmetro no body.")
    }

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const values = [
      [
        text,
        name,
        'no',
      ]
    ]
    
    const requestBody = {
      values,
    }
    //Update Row
    const updateValue = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${collection}!A${index}:C${index}`, 
      valueInputOption: "USER_ENTERED",
      requestBody,
    })

    res.status(200).send(updateValue);
  } catch (error) {
    res.status(400).send({ error: error.message });  
  }
});

/*
router.delete("/", async (req, res) => {
  res.status(200).send({ message: "Fez um DELETE" });
});
*/

module.exports = router;
