const Club = require('../models/club')
const User = require('../models/user')
const Brands = require('../models/brands')
const Message = require('../models/message')


module.exports = {
    index,
    create,
    delete: deleteClub,
    show,
    update
}

async function index(req, res, next){
    try {
        const clubs = await Club.find({user: req.user._id}).sort('brand')
        //console.log(clubs[0].condition[0], typeof(clubs[0].condition[0]))
        res.render('clubs/index', {
            clubs,
            brands: Brands
            
        })    
    } catch (err) {
        console.log(err)
        next()
    }
    
}

async function create(req, res, next){
    req.body.forSale = !!req.body.forSale ? true : false
    req.body.user = req.user._id
    req.body.pictures = req.files.pic.data
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
        await Message.deleteMany({club: req.params.id})
        await Club.deleteOne({'_id': req.params.id, 'user': req.user._id})
        res.redirect('/clubs')

    } catch (err) {
        console.log(err)
        next()
    }
}


async function show(req, res, next){
   
    try {
        const club = await Club.findById(req.params.id)
        
        
        if (req.user.id.toString() != club.user.toString()) {
            if(club.forSale){
                res.redirect(`/home/${club._id}`)
                return 
            } else{
                res.redirect('/home')
                return
            }
            
        }
        res.render('clubs/show', {
            club, 
            brands: Brands
        })
        
    } catch (err) {
        console.log(err)
        next()
        
    }
}

async function update(req, res, next){
    req.body.forSale = !!req.body.forSale ? true : false
    req.body.condition = [req.body.headCondition, req.body.shaftCondition, req.body.gripCondition]
    try {
        const club = await Club.findById(req.params.id)
        Object.assign(club, req.body)
        await club.save()
        res.redirect(`/clubs/${req.params.id}`)
        
    } catch (err) {
        console.log(err)
        next()
        
    }

}

// function newClub(req, res, next){
//     res.render('/clubs/new', {

//     })
// }