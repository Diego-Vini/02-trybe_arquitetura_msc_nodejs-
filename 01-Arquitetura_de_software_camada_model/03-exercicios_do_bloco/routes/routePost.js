const router = require('express').Router();
const { body, validationResult } = require('express-validator')

const ModelUser = require('../models/User');

router.post('/user', 
[
  body("firstName").isString().withMessage({error: true, message: "O campo nome deve conter somente letras"}),
  body("firstName").notEmpty().withMessage({error: true, message: "O campo nome não pode estar em branco"}),
  body("lastName").isString().withMessage({error: true, message: "O campo sobrenome deve conter somente letras"}),
  body("lastName").notEmpty().withMessage({error: true, message: "O campo sobrenome não pode estar em branco"}),
  body("email").isEmail().withMessage({error: true, message: "O campo email deve ter o formato email@email.com"}),
  body("password").isString().withMessage({error: true, message: "O campo password aceita somente letras"}),
  body("password").isLength({min:6}).withMessage({error: true, message: "O campo 'password' deve ter pelo menos 6 caracteres"})
],
async (req, res) => {
 const {firstName, lastName, email, password} = req.body;

 const errors = validationResult(req);
 const msgErrors = errors.array()

 if(!errors.isEmpty()) return res.status(400).json( {errors: msgErrors[0].msg});

 const newUser = await ModelUser.createNewUser({ firstName, lastName, email, password });
 console.log(newUser)

  res.status(201).json(newUser)
});

module.exports = router;