const mongoose = require('mongoose');

const User = mongoose.model('User',{
    "first_name":{"type":String,"required":true,"trim":true},
    "last_name":{"type":String,"required":true},
    "username":{"type":String,"required":true},
    "email":{"type":String,"required":true},
    "password":{"type":String,"required":true,"select":false}
})

module.exports = User;