const {body,check} = require('express-validator')

exports.cekRegister = [
    check('email','masukkan email dengan benar').isEmail(),
    check('email','email tidak boleh kosong').notEmpty(),
    check('username','username tidak boleh kosong').notEmpty(),
    check('username','username minimal 3 karakter').isLength({ min: 5}),
    check('username','username minimal 10 karakter').isLength({ max: 10}),
    check('password','password harus angka').isNumeric(),
    check('password','password tidak boleh kosong').notEmpty(),
    // body('email').isEmail(),
    // body('email').notEmpty(),
    // body('username').notEmpty(),
    // body('password').isLength({ min: 3 }),
]