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


## Brief
The brief for this project was to create a fullstack application using MongoDB, Express.js and Node.js implementing all CRUD operations and implementing user authorisation using OAuth2.


## Planning
ERDs and Wireframes can be found in the planning directory on the repo. 
The inspiration for the frontend was taken from standard responsive e-commerce websites like eBay and Amazon.

# Build Process
The build process was split up into individual steps. These steps were:
1. Database set up
2. User model creation and authenitication
3. Page routing
4. Model creation
5. CSS, HTML, Express View Engines
6. CRUD Operations
   
### Database Hosting
The database was set up and hosted using MongoDB Atlas.

### User Model

The user model is detailed below:

```javascript
const userSchema = new Schema({
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
```
This model is populated using OAuth2 with the Google strategy.

### Page Routing
For the GET requests, the routing setup was straightforward. Leveraging the user object in the request, I could conditionally render links on the home page. This means if the user was logged in, certain links would be displayed. Additionally, if users manually attempted to navigate to restricted pages, they'd be redirected to the home page.

### Additional Models
Club Model
The first of the additional models is the club model:
```javascript
  const clubSchema = new Schema({
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
});
```

This model exhibits a many-to-one relationship with the user. It retains all pertinent information about the club, inclusive of an image that's stored within a Buffer.

### Messages Model
The final model is dedicated to messaging:
```javascript
const message = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: String
  }, {
    timestamps: true
  })

const msgSchema = new Schema({
    club: {type: Schema.Types.ObjectId, ref: 'Club'},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    messages: [message],
    offer: Number
  }, {
    timestamps: true
  });
```

This app is structured with two models, where the message acts as a sub-document within the msgSchema. The msgSchema retains information about the offer as well as the relationship between the two messaging participants (details like which club is in question, who the buyer is, and who the seller is). Meanwhile, the message sub-document encompasses individual messages, tracking both the sender and the timestamp of each message.

For styling, Bootstrap was employed. This choice was made to quickly ensure a responsive design that's also aesthetically pleasing.

The app offers CRUD functionality, allowing users to add golf clubs to their inventory and list them. They can edit or delete clubs from their inventory as needed. On the individual display page for each club, if a user is the owner of that club, they have the capability to edit its details. Conversely, if they are not the club's owner, they can propose an offer for it. Proposing an offer reveals a text area where users can draft a message to the club's owner, thereby initiating a messaging thread.

##  Overview of MVP
Upon launching the app, users can log in using their Google account. Once authenticated, they're directed to the homepage, which showcases a listing of golf clubs available for sale from other users.

Users have their personal "Inventory" section where they can add details about their golf clubs, including images. Within this inventory, they can designate specific clubs to be put up for sale. Clubs marked for sale become visible on the homepage for other users to see.

When a user finds a club they're interested in on the homepage, they can click on it to view its detailed specifications. From this details page, they have the option to make an offer on the club. Initiating an offer activates a messaging thread between the prospective buyer and the club's seller, facilitating discussions around the purchase details.


## Wins
One of the standout achievements in developing this app was the successful implementation of the messaging service. Working with Express and Node has its constraints, especially when not complemented by a responsive framework like React or Vue. Despite these limitations, I managed to devise a robust messaging system. This system adeptly tracks the roles of users - identifying who is the buyer and who is the seller. What's more, it consolidates all interactions between the two, storing their entire conversation within a single instance. This not only enhances the user experience but also streamlines the communication process within the app.

## Challenges
Developing a comprehensive application within the span of a week came with its unique set of challenges. With such tight time constraints, every moment spent troubleshooting directly impacted the app's features, sometimes necessitating the tough decision to forgo certain functionalities.

One particular time-consuming challenge I encountered was making design choices. Navigating the balance between aesthetics, user experience, and practicality within a limited timeframe tested my abilities and required me to prioritize and make swift decisions.

Despite these challenges, the process was a valuable learning experience, reminding me of the importance of efficient problem-solving, swift decision-making, and the need to sometimes compromise for the broader project goal.

## Future improvements
Currently there is no way for a user to search for a specific club or use filters to search through types of clubs. This functionality is important for any e-marketplace and is in the development pipeline. 

As of now you can only add one image per club, I would like to increase this number and also implement some kind of image compression to save space in the database and improve load times.
