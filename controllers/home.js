const Club = require('../models/club')
const User = require('../models/user')

module.exports = {
    index
}

async function index(req, res, next){
    const today = new Date()
    try {
        const users = []
        const allClubs = await Club.find({createdAt : { $lte : today-1}})
        for (let i=0; i< allClubs.length; i++){
            const user = await User.findById(allClubs[i].user)
            users.push(user.name)
        }
        console.log(users[0])
        res.render('home/index', {
            clubs: allClubs,
            users
        })        

    } catch (err) {
        console.log(err)
        next()
        
    }
}



