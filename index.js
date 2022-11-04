const express =require('express');
//const { readSync } = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));

app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home page route
app.get('/', (req, res) => 
    res.render('index', {
    title: 'Member App',
    members
})
);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()  => console.log(`Server started on port ${PORT}`));

