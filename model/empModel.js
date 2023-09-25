const mongoose = require("mongoose")

const empSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    department: String,
    salary: Number
}, {
    versionKey: false
})

const EmpModel = mongoose.model("employee", empSchema)

module.exports = {
    EmpModel
}