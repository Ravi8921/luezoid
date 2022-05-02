Context Setting & introduction
Explain the expectations of the interviewer from the assignment interview point of view
Showing knowledge and other awareness while answering specific questions
How to build intuition and build a solution from scratch even when you have never dealt with a similar situation in the past
Agenda overview
Schema discussion
REST API planning
Post article strategy
Validation Logic
Subscription Strategy
Validation Logic
Authenticated routes
Email strategy

Problem Statement Discussion

title: "How to code in React.", description: "Intro to react", body: "Long text comes here", createdAt: Date.now(), websiteId: ObjectId("626cdfe727f5353df51de38e")})
{
Schema

{Subscription
email: "sourabhbagrecha@gmail.com", websiteId: ObjectId
Email
WebsiteId
CreatedAt

Website_id
Name
Created_at

Articles_id
Title
Description(small)
Body Text
Created_at
WebsiteId

{Admin
Email
Password}

REST API
[Admin] POST /website
GET /website/:id

[Admin] POST /article
With website-id in req-body
Email sending logic
Introduce SendGrid/nodemailer
GET /article/:id
[Public] POST /website/:id 
Subscription logic
Email, WebsiteId in request body
Admin Login
Admin Authentication 
Admin Middlewares
Approach 
Take a few breaks in between and make sure you are on the right track as asked in the question
Not necessary to solve the complete problem, but to focus on the important stuff
Pseudo Code Sharing + Interview Strategy
Start with comments
Variable naming is more important than you think!
Make sure that you are not missing out on key things that the question mentioned
Solution Discussion 
Not needed in assignment rounds
Question & Answer (Q&A)
References (Youtube videos, Glassdoor, and other such platforms, Practice questions, Websites to refer to)
Code
// [Admin Only] To create a new websited with a Name
db.websites.insertOne({ name: "Bloomberg", createdAt: Date.now() })
{
 acknowledged: true,
 insertedId: ObjectId("626cdfe727f5353df51de38e")
}
 
 
db.websites.find()
[
 {
   _id: ObjectId("626cdfe727f5353df51de38e"),
   name: 'Bloomberg',
   createdAt: 1651302375312
 }
]
 
// To subscribe a user to a particular website using their emailId and the websiteId they want to be subscribed to
db.subscriptions.insertOne({email: "sourabhbagrecha@gmail.com", websiteId: ObjectId("626cdfe727f5353df51de38e"), createAt: Date.now()})
{
 acknowledged: true,
 insertedId: ObjectId("626ce03427f5353df51de38f")
}
 
db.subscriptions.find()
[
 {
   _id: ObjectId("626ce03427f5353df51de38f"),
   email: 'sourabhbagrecha@gmail.com',
   websiteId: ObjectId("626cdfe727f5353df51de38e"),
   createAt: 1651302452808
 }
]
 
// [Admin Only] To create an article for a website with a websiteId
db.articles.insertOne({title: "How to code in React.", description: "Intro to react", body: "Long text comes here", createdAt: Date.now(), websiteId: ObjectId("626cdfe727f5353df51de38e")})
{
 acknowledged: true,
 insertedId: ObjectId("626ce09f27f5353df51de390")
}
 
// To find all the subscribers for a website
db.subscriptions.find({ websiteId: ObjectId("626cdfe727f5353df51de38e")})
[
 {
   _id: ObjectId("626ce03427f5353df51de38f"),
   email: 'sourabhbagrecha@gmail.com',
   websiteId: ObjectId("626cdfe727f5353df51de38e"),
   createAt: 1651302452808
 }
]
 
// To send an email to every subscriber
for(let sub of subs) Sendgrid.sendEmail(sub.email, `Title: ${article.title} Description: ${sub.description} Link: /article/${article._id}`)

Create a simple subscription platform(only RESTful APIs with Mongo) in which users can subscribe to
a website (there can be multiple websites in the system). Whenever a new post is published on a
particular website, all it's subscribers shall receive an email with the post title and description in it.
(no authentication of any kind is required)
MUST:-
- Endpoint to create a "post" for a "particular website".
- Endpoint to login admin and add web articles
- Endpoint to make a user subscribe to a "particular website" with all the tiny validations included in
it.
- No duplicate stories should get sent to subscribers.
- Deploy the code on a public github repository.
OPTIONAL:-
- Open API documentation (or) Postman collection demonstrating available APIs & their usage.
- Use of caching wherever applicable.
Note:-
1. Please provide special instructions(if any) to make to code base run on our local/remote platform.