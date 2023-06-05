const Club = require('../models/club')
const User = require('../models/user')
const Message = require('../models/message')

module.exports = {
    index,
    show,
    create
}

async function index(req, res, next){
    const today = new Date()
    try {
        const users = []
        const allClubs = await Club.find({createdAt : { $lte : today-1}, forSale: true})
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

async function show(req, res, next){
    try {
        const club = await Club.findById(req.params.id)
        if (!club.forSale) {
            res.redirect('/home')
            return
        } else{
            res.render('home/show', {
                club
            })
        }
    } catch (err) {
        console.log(err)
        next()
        
    }
}


// this is kind of for messages but from where it's created it makes most sense to be here
async function create(req, res, next){
    req.body.buyer = req.user._id
    req.body.messages = []
    req.body.messages.push(req.body.message)
    
    try {
        const club = await Club.findById(req.params.id)
        req.body.seller = club.user
        req.body.club = club._id
        await Message.create(req.body)
        res.redirect('/messages')

        
    } catch (err) {
        console.log(err)
        next()
        
    }
}



