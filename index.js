const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("hack-ku-2024/dist"));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on port " + port);
});

//================ TEMP DATA
const users = [
    {id: 1, name: "Riley", xp: 10, nextLevelXP: 20, level: 2},
    {id: 2, name: "Ryland", xp: 5, nextLevelXP: 10, level: 1},
    {id: 3, name: "Averi", xp: 2, nextLevelXP: 300, level: 5},
    {id: 4, name: "Aryen", xp: 0, nextLevelXP: 50, level: 3},
];

const pins = [
    {id: 1, name: "Trash 1", latitude: 0, longitude: 0},
    {id: 2, name: "Trash 2", latitude: -200, longitude: 100}
]

//================ API CALLS
app.get(`/api/users/:id`, (req, res) => {
    const id = req.params.id;
    const user = getUser(id);
    if (!user) {
        res.status(404).send({ error: `User ${id} not found`})
    }
    else {
        res.send({ data: user })
    }
})

app.get(`/api/users`, (req, res) => {
    if (!users) {
        res.status(404).send({ error: `Users not found`})
    }
    else {
        res.send({ data: users })
    }
})

app.get(`/api/pins`, (req, res) => {
    if (!users) {
        res.status(404).send({ error: `Pins not found`})
    }
    else {
        res.send({ data: pins })
    }
})

app.get(`/api/pins/:id`, (req, res) => {
    const id = req.params.id;
    const pin = getPin(id);
    if (!pin) {
        res.status(404).send({ error: `Pin ${id} not found`})
    }
    else {
        res.send({ data: pin })
    }
})

//================ SERVER FUNCTIONS
function getUser(id) {
    return users.find(p => p.id == id);
}

function getPin(id) {
    return pins.find(p => p.id == id)
}