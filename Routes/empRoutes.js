const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { EmpModel } = require("../model/empModel");

const empRouter = express.Router()
empRouter.use(express.json())

empRouter.get("/", async (req, res) => {
    try {
        let employees = await EmpModel.find({})
        res.send({ "employees": employees })
    } catch (err) {
        console.log(err)
    }
})

empRouter.post("/add", async (req, res) => {
    let { firstname, lastname, email, department, salary } = req.body

    try {
        let emp = await new EmpModel({ firstname, lastname, email, department, salary })
        await emp.save()
        res.send({ "msg": "Employee created successfully" })
    } catch (err) {
        console.log(err)
    }
})

empRouter.patch("/update/:id", async (req, res) => {
    let { id } = req.params

    try {
        await EmpModel.findByIdAndUpdate(id, req.body)
        res.send({ "msg": `Employee with id:${id} updated successfully` })
    } catch (err) {
        console.log(err)
    }
})

empRouter.delete("/delete/:id", async (req, res) => {
    let { id } = req.params

    try {
        await EmpModel.findByIdAndDelete(id)
        res.send({ "msg": `Employee with id:${id} deleted successfully` })
    } catch (err) {
        console.log(err)
    }
})

empRouter.get("/department", async (req, res) => {
    let { department } = req.query
    try {
        let employees = await EmpModel.find({ department })
        res.send({ "employees": employees })
    } catch (err) {
        console.log(err)
    }
})

empRouter.get("/sort", async (req, res) => {
    let { order } = req.query
    try {
        if (order == "desc") {
            let employees = await EmpModel.find({}).sort({ "salary": -1 })
            res.send({ "employees": employees })
        } else {
            let employees = await EmpModel.find({}).sort({ "salary": 1 })
            res.send({ "employees": employees })
        }
    } catch (err) {
        console.log(err)
    }
})

empRouter.get("/search", async (req, res) => {
    let { firstname } = req.query
    try {
        let employees = await EmpModel.find({ "firstname": firstname })
        res.send({ "employees": employees })

    } catch (err) {
        console.log(err)
    }
})

empRouter.get("/pagination", async (req, res) => {
    let { page } = req.query
    try {
        let skip = page * 5
        let employees = await EmpModel.find({}).limit(5).skip(skip)
        res.send({ "employees": employees })
    } catch (err) {
        console.log(err)
    }
})



module.exports = {
    empRouter
}