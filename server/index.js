require('dotenv').config();
const express = require('express')
const userCtrl = require('./controllers/user')
const postCtrl = require('./controllers/posts')
const massive = require('massive')
const session = require('express-session')
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env


const app = express();

app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
}).then((db) => {
    console.log("Database connected");
    app.set("db", db);

    app.listen(SERVER_PORT, () =>
      console.log(`Server running on ${SERVER_PORT}`)
    );
  })
  .catch((err) => {
      console.log("Hitting this error")
      console.log(err)
  })

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)