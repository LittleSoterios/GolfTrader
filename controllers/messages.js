const Club = require('../models/club')
const User = require('../models/user')
const Message = require('../models/message')

module.exports = {
    index,
    show,
    update
}

async function index(req, res, next){
    try {
        const messagesSell = await  Message.find({seller: req.user._id})
        const messagesBuy = await Message.find({buyer: req.user._id})
        const clubBuy = []
        const buyers = []
        const clubSell = []
        const sellers = []
        //console.log(messagesSell)
        //console.log(messagesSell[0].messages[0])
        const forLoop = async _ =>{
            for(let i = 0; i<messagesSell.length; i++){
                const x = await Club.findById(messagesSell[i].club.toString())
                clubSell.push(x)
                const y = await User.findById(messagesSell[i].buyer.toString())
                buyers.push(y)
            }  
        
            for(let i = 0; i<messagesBuy.length; i++){
                const x = await Club.findById(messagesBuy[i].club)
                clubBuy.push(x)
                const y = await User.findById(messagesBuy[i].seller)
                sellers.push(y)
            }
        }
        await forLoop()
        
        
        

        res.render('messages/index', {
            messagesSell,
            messagesBuy,
            clubSell,
            clubBuy,
            sellers,
            buyers
        })
        
    } catch (err) {
        console.log(err)
        next()        
    }
}


async function show(req, res, next){
    try {
        const message = await Message.findById(req.params.id)
        let recipient;
        if(message.buyer.toString() == req.user._id.toString()){
            recipient = await User.findById(message.seller)
        } else{
            recipient = await User.findById(message.buyer)
        }
        
        res. render('messages/show', {
            message,
            recipient
        })
        

        
    } catch (err) {
        console.log(err)
        next()
        
    }



}

async function update(req, res, next){
    try {
        console.log(req.body.msg)
        const message = await Message.findById(req.params.id)
        console.log(req.user._id.toString() , message.buyer.toString())
        console.log(req.user._id.toString() == message.seller.toString())
        if (!(req.user._id.toString() != message.buyer.toString() || req.user._id.toString() != message.seller.toString())) {
            res.redirect('/home')
            return
        }
        message.messages.unshift({message: req.body.msg, user: req.user._id})
        message.save()
        res.redirect(`/messages/${req.params.id}`)
    } catch (err) {
        console.log(err)
        next()
    }
}

