const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion , Payload } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/dialogflow", async (req, res) => {
    res.send(200);
  })

app.post("/dialogflow", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });


    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("Hi, I am the virtual assistant of MLSA Resturant. Tell me What do you want to order.")
    
        const payload = {
            "richContent": [
              [
                {
                  "options": [
                    {
                      "text": "Dr. Issa Nagari"
                    },
                    {
                      "text": "Prof. Amir"
                    },
                    {
                      "text": "Dr. Jhon patrick"
                    },
                    {
                      "text": "Sara kirchoff"
                    },
                    {
                      "text": "location"
                    }
                  ],
                  "type": "chips"
                }
              ]
            ]
          }
          agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            })
          );
    }

    function sendNotes(agent) {
        console.log(`intent  =>  sendNotes`);
        agent.add("Shop No.7, Kanwal Square, Sc-9, Block L, North Nazimabad, Karachi Karachi, Sindh, Pakistan-7460")
    }

    let intentMap = new Map();
    intentMap.set('hi', hi); 
    intentMap.set('Location', sendNotes);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});