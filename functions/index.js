const functions = require("firebase-functions");
const express = require("express");
const { response, request } = require("express");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const { createProxyMiddleware } = require("http-proxy-middleware");
var cors = require("cors");

const { sendEmail } = require("./mail");

// const setupProxy = require("./setupProxy");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(
//   "/mail",
//   createProxyMiddleware({
//     target: "http://localhost:5000",
//       changeOrigin: true,
//   })
// );
app.get("/timestamp", (request, response) => {
  response.send(`send ${Date.now()}`);
});

// setupProxy()

app.get("/timestamp-date", (request, response) => {
  response.set(`send ${Date.now()}`);
  response.send(`send ${Date.now()}`);
});

app.post("/mail/sendMail", (req, res) => {
    sendEmail(req.body.email, req.body.name, "contact", res.body);
  sendEmail(
    "azurehomesandconsultants@gmail.com",
    req.body.name,
    "admin",
    req.body
  );
  res.send(`send received`);
});

exports.app = functions.https.onRequest(app);
