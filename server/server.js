const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGOURL = 'mongodb+srv://yogiii:yogeshb26@cluster0-yopel.mongodb.net/test?retryWrites=true&w=majority'

const app = express();

mongoose.connect(MONGOURL)
.then(()=> console.log("DB Connected"))
.catch(error => console.log(error));

const { User } = require('./Model/user')

app.use(bodyParser.json());

app.post ('/api/user/signup', (req, res) => {
    const user = new User({
        number: req.body.number,
        password: req.body.password
    }).save((error, response) => {
        if(error) res.status(400).send(error)
        res.status(200).send(response)
    })
})

app.post ('/api/user/signin', (req, res) => {
    User.findOne({'number': req.body.number}, (error, user) =>{
        if(!user) res.json({message: 'Login failed, user not found'})
        user.comparePassword(req.body.password, (error, isMatch) => {
            if(error) throw error;
            if(!isMatch) return res.status(400).json({
                message: 'Wrong Password'
            });
            res.status(200).send('Logged in successfully')
        })
    })
});

const PORT = process.env.PORT || 5600

app.listen(PORT,() => console.info(`server running on ${PORT}`))