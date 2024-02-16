/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Rosco Taner____________ Student ID: 126154236___ Date:2/16/2024 _______________
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var collegeData = require("./modules/collegeData.js");

// Initialize college data
collegeData.initialize()
    .then(() => {
        // Routes

        // GET /students
        app.get("/students", (req, res) => {
            let course = req.query.course;
            if (course) {
                collegeData.getStudentsByCourse(course)
                    .then(students => {
                        if (students.length > 0) {
                            res.json(students);
                        } else {
                            res.json({ message: "no results" });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            } else {
                collegeData.getAllStudents()
                    .then(students => {
                        if (students.length > 0) {
                            res.json(students);
                        } else {
                            res.json({ message: "no results" });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            }
        });

        // GET /tas
        app.get("/tas", (req, res) => {
            collegeData.getTAs()
                .then(tas => {
                    if (tas.length > 0) {
                        res.json(tas);
                    } else {
                        res.json({ message: "no results" });
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        });

        // GET /courses
        app.get("/courses", (req, res) => {
            collegeData.getCourses()
                .then(courses => {
                    if (courses.length > 0) {
                        res.json(courses);
                    } else {
                        res.json({ message: "no results" });
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        });

        // GET /student/num
        app.get("/student/:num", (req, res) => {
            let num = req.params.num;
            collegeData.getStudentByNum(num)
                .then(student => {
                    if (student) {
                        res.json(student);
                    } else {
                        res.json({ message: "no results" });
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        });

        // GET /htmlDemo
        app.get("/htmlDemo", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
        });

        // GET /about
        app.get("/about", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "about.html"));
        });

        // GET /
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "home.html"));
        });

        // No matching route
        app.use((req, res) => {
            res.status(404).send("Page Not Found");
        });

        // start the server
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT)
        });
    })
    .catch(err => {
        console.error(err);
        console.error("Failed to initialize college data. Server not started.");
    });
