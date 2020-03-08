const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    number:{
        type: Number,
        required: true,
        unique: 1,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.methods.comparePassword = function(candidatePassword, checkPassword){

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err)
        checkpassword(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }