const userModel = require("../model/userModel")
const bcrypt = require("bcrypt");
const saltRounds = 10
const jwt = require("jsonwebtoken");

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };
  const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}



const createUser = async function (req, res) {
    try {
        const requestBody = req.body;
        const { email, password } = requestBody

        //let collegeName = req.query.collegeName;

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: "Plz enter intern details" })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "Plz enter  email" })
            return
        }
        
        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: "Plz enter password" })
            return
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email }); // {email: email} object shorthand property

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} email address is already registered` })
            return
        }
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        // now we set user password to hashed password
        requestBody.password = await bcrypt.hash(password, encryptedPassword);
        
        let savedData = await userModel.create(requestBody)
        res.status(201).send({ status: true, data: { savedData } });

    }
    catch (err) {

        res.status(500).send({ status: false, msg: err.message });
    }
}

const Login = async (req, res) => {
    try {
      const Email = req.body.email;
      const Password = req.body.password;
  
      if (!Email || (typeof Email === 'string' && Email.trim().length === 0)) {
        return res.status(400).send({ status: false, message: "Email is required" })
      }
  
      if (!Password || (typeof Password === 'string' && Password.trim().length === 0)) {
        return res.status(400).send({ status: false, message: `Password is required` })
      }
  
      let user = await userModel.findOne({ email: Email });
      if (user) {
  
        const _id = user._id
        const name = user.email
        const password = user.password
  
        const validPassword = await bcrypt.compare(Password, password);
  
        if (!validPassword) { return res.status(400).send({ status: false, message: " Invalid password" }); }
        let payload = { userId: _id };
        const generatedToken = jwt.sign(payload, "ravikant", { expiresIn: "60m" });
  
        res.header("user-login", generatedToken);
  
        return res
          .status(200).send({
            status: true, message: name + ", You have  logged in successfully",
            userId: _id,
            generatedToken
          });
      }
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };



module.exports.Login = Login
module.exports.createUser = createUser