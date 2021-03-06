const db = require("../models");
const mongoose = require("mongoose")

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).sort({ day: -1 })
            .then((workouts) => {
                res.json(workouts)
            })
            .catch(error => res.json(error))
    })

    app.get("/api/workouts/range", (req, res) => {
        const days = req.body.numberOfDays || 7
        const startDate = new Date().setDate(new Date().getDate() - days)
        db.Workout.find({ day: { $gte: startDate } }).sort({ day: -1 })
            .then((workouts) => {
                res.json(workouts)
            })
            .catch(error => res.json(error))
    })

    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findOneAndUpdate(req.params.id, { $push: { exercises: req.body} }, {new: true})
            .then((newWorkout) => {
                res.json(newWorkout)
            })
            .catch(error => res.json(error))
    })

    app.post("/api/workouts", (req, res) => {
        const workout = new db.Workout()
        workout.save()
            .then((results) => {
                res.json(results)
            })
            .catch(error => res.json(error))
    })

}