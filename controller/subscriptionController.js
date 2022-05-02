
const nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const fs = require("fs");
const validator =require('../validation/validator')

const takeSubscription = async function (req, res) {
       try {

             fs.readFile("articleDetails.json", "utf8", function (err, titles) {
               let reciever = req.body.email;
              
               if (!validator.isValid(email)) {
                  res.status(400).send({ status: false, msg: "Plz enter  email" })
                  return
              }
               var data = JSON.parse(titles);
               var allTitles = data.map((x) => x.title);
         
               let uniqueTitles = [...new Set(allTitles)];
         
               let ABC = uniqueTitles.join(" ");
         
              
               var options = {
                  service:"gmail",
                  auth: {
                      api_user: 'ravikant8921@gmail.com',
                      api_key: 'password'
                  },
              }
                  
              var mailer = nodemailer.createTransport(sgTransport(options));

               var email = {
                  to: reciever,
                  from: 'ravikant8921@gmail.com',
                  subject: 'Hi there',
                  text: 'Awesome sauce',
                  html: '<b>Awesome sauce</b>'
              };
         
               mailer.takeSubscription(email, (err, data) => {
                 if (err) {
                   return console.log(err);
                 }
                  return console.log("data");
               });
             });
         
             return res.send(
              `Subscription are successfull`
             );
           } catch (error) {
             res.status(500).send(error.message);
           }
         };
         
      

module.exports.takeSubscription = takeSubscription





   

   
