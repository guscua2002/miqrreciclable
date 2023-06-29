const User = require("../models/qr.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allDaUsers => res.json({ users: allDaUsers }))
        .catch(err => res.status(400).json({ error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => res.json({ user: oneSingleUser }))
        .catch(err => res.status(400).json({ error: err }));
};

module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
        .catch(err => res.status(400).json({ error: err }));
};

module.exports.updateExistingUser = async (req, res) => {
    const updatedQrData = req.body;
    try {
        const result = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { qrcode: updatedQrData } },
            { new: true }
        );
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ error: err }));
};

module.exports.findOneQR = async (req, res) => {
    const id = req.params.id.substring(0, 24)
    const idQr = req.params.id.substring(24, req.params.id.length)
    try {
        const user = await User.findOne(
            { _id: id },
        );
        if (user) {  
            const qrSelected = user.qrcode;  
            const qrSelectedFinal = qrSelected.find(item => item.idqr === Number(idQr));             
            if (qrSelectedFinal) {
                const contador = qrSelectedFinal.counter + 1;
                try {
                        const result = await User.findOneAndUpdate(
                        { _id: id, "qrcode.idqr": Number(idQr)},
                        { $set: { "qrcode.$.counter": contador }},
                        { new: true }
                    );   
                    res.redirect(qrSelectedFinal.urlredirect)                    
                } catch (error) {
                    res.status(400).json({ error });
                } 
            } else {
                res.status(404).json({ error: 'QR not found' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json({ user: newUser });

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

module.exports.findStores = async (req, res) => {
    const { city } = req.body;
    try {
        const users = await User.find({ city });
        res.json({ users: users });
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user === null) {
                return res.status(404).json({ error: "Email no registrado" });
            } else {
                bcrypt.compare(password, user.password)
                    .then(isValid => {
                        if (isValid) {
                            const userToken = jwt.sign({
                                id: user._id
                            }, process.env.SECRET_KEY);

                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({ user: user.id })
                        } else {
                            res.status(403).json({ error: "Contraseña incorrecta" })
                        }
                    })
            }
        }).catch(err => res.json({
            error: "Error al iniciar sesión",
            err
        }));
}

module.exports.logout = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email });
        res.clearCookie('usertoken')
            .json({ msg: 'Chau vuelve pronto' });

    } catch (error) {
        res.status(403).json({
            error: "Error al cerrar sesión",
            error
        })
    }
}

module.exports.changepassword = async (req, res) => {
    try {
        const change = await User.findOne({ _id: req.params.id })
        change.password = req.body.password
        change.confirmPassword = req.body.confirmPassword
        try {
            const result = await change.save();
            res.json({ result: result });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    } catch (error) {
        res.status(400).json({
            error: "Error",
            error
        })
    }
}




