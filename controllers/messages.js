const Club = require('../models/club')
const User = require('../models/user')
const Message = require('../models/message')

module.exports = {
    index
}

async function index(req, res, next){
    try {
        const messagesSell = await  Message.find({seller: req.user._id})
        const messagesBuy = await Message.find({buyer: req.user_id})
        const clubBuy = []
        const buyers = []
        const clubSell = []
        const sellers = []
        const forLoop = async _ =>{
            for(let i = 0; i<messagesSell.length; i++){
                const x = await Club.findById(messagesSell[i].club.toString())
                clubSell.push(x)
                const y = await User.findById(messagesSell[i].buyer.toString())
                buyers.push(y)
            }  
        
            for(let i = 0; i<messagesBuy.length; i++){
                const x = await Club.findById(messagesBuy[i].club)
                clubSell.push(x)
                const y = await User.findById(messagesBuy[i].seller)
                sellers.push(y)
                console.log('does this??')
            }
        }
        await forLoop()
        
        
        console.log(messagesBuy)
        console.log(messagesSell)
        console.log(buyers)
        console.log(sellers)

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

