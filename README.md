# Golf-Trader

## Description

Golf-Trader is a e-marketplace application designed to allow users to sell, buy and trade golf clubs. Users can use create accounts using OAuth2 with the google strategy so that they access to their listings and messages. Users can make offers on other users' listings.

## Technologies
The application is made using the MEN (MongoDB, Express.js, Node.js) stack. 


## Getting started
The application is live at https://golf-trader.fly.dev/home 
Feature Trello board can be found here: https://trello.com/b/hWmUzYoA/planning-project-2


## Timeframe
This project was completed over the course of one week, solely by myself.


## Breif
The brief for this project was to create a fullstack application using MongoDB, Express.js and Node.js implementing all CRUD operations and implementing user authorisation using OAuth2.


## Planning
ERDs and Wireframes can be found in the planning directory on the repo. The inspiration for the frontend was taken from standard responsive e-commerce websites like eBay and Amazon.

# Build Process
The build process was split up into individual steps. These steps were:
1. Database set up
2. User model creation and authenitication
3. Page routing
4. Model creation
5. CSS, HTML, Express View Engines
6. CRUD Operations
   
The database was set up and hosted using MongoDB Atlas.

The user model can be seen below: 
`const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
}, {
  timestamps: true
}); 
`
It is populated using OAuth2 and the google strategy.

Page routing for GET request was simple set up and using the user object in the request I could conditionally render links on the home page based on whether the user was logged in, or redirect them to the home page if the manually tried to naviagte to a page only authenticated users should have access to.

The only three more models were created. The first that was implemented is the club model:
`const clubSchema = new Schema({
  clubType: String,
  brand: String,
  model: String,
  condition: [Number],
  value: Number,
  pictures: Buffer,
  forSale: Boolean,
  notes: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
});`

This models has a many-to-one relationship with the user and holds all of the information about the club, including a picture which is stored in a Buffer.

The last model is the messages model: 
`const message = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: String
  }, {
    timestamps: true
  })`
`const msgSchema = new Schema({
    club: {type: Schema.Types.ObjectId, ref: 'Club'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    messages: [message],
    offer: Number
  }, {
    timestamps: true
  });`

This is split into two models with the message being a sub-document in the msgSchema. The msgSchema holds information about the offer and relationship between the two messaging parties (what club is it regarding, who is the buyer and who is the seller) and the message subdocument holds individual messages and tracks who sent that message and when. 

Bootstrap was used for the styling as a quick way to 

CRUD functionality allows users to add clubs to their inventory and list them. They can also edit and delete clubs from their inventory. On the show page for each club if they are the owner of that clubs they can edit the details of the club, or if they are not the owner of the club they can make an offer for the club. Making an offer opens up a text area where they can write a message to the owner and that starts the messaging thread.


## Challenges




## Future improvements
Currently there is no way for a user to search for a specific club or use filters to search through types of clubs. This functionality is important for any e-marketplace and is in the development pipeline. 

As of now you can only add one image per club, I would like to increase this number and also implement some kind of image compression to save space in the database and improve load times.

