const mongoose = require('mongoose');

const Student = mongoose.model('Student',{
    "fullName":{"type":String,"required":true},
    "address":{"type":String,"required":true},
    "age":{"type":Number,"required":true},
    "gender":{"type":String,"required":true},
    "dp":{"type":String,"required":true,"default":"no-img.jpg"}
})

module.exports = Student;