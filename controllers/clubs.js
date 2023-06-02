const Club = require('../models/club')
const User = require('../models/user')


module.exports = {
    index,
    create,
    delete: deleteClub
}

async function index(req, res, next){
    try {
        const clubs = await Club.find({user: req.user._id}).sort('brand')
        console.log(clubs[0].condition[0], typeof(clubs[0].condition[0]))
        res.render('clubs/index', {
            clubs
            
        })    
    } catch (err) {
        console.log(err)
        next()
    }
    
}

async function create(req, res, next){
    console.log(req.body.pictures, typeof(req.body.pictures))
    req.body.forSale = !!req.body.forSale ? true : false
    console.log(req.body.forSale)
    req.body.user = req.user._id
    req.body.condition = [req.body.headCondition, req.body.shaftCondition, req.body.gripCondition]
    try {
        await Club.create(req.body)
        res.redirect('/clubs')
        
    } catch (err) {
        console.log(err)
        next()
        
    }
}

async function deleteClub(req, res, next){
    try {
        await Club.deleteOne({'_id': req.params.id, 'user': req.user._id})
        res.redirect('/clubs')

    } catch (err) {
        console.log(err)
        next()
    }
}

// function newClub(req, res, next){
//     res.render('/clubs/new', {

//     })
// }