

const registerView = (req, res) => {
    res.render("register", {

    })
}

const loginView = (req, res) => {

    res.render("login", {
    } )
}

const getPlayer = (req, res) => {
    const username = req.params.username
    const {findPlayer} = require('../models/Player.js')
    findPlayer(username).then(
        function(result){
            res.send(result)
        }
    )
    
}
module.exports =  {
    registerView,
    loginView,
    getPlayer
};