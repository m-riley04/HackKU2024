const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('hack-ku-2024/dist'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on port " + port);
});

// Fallback to index.html for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'hack-ku-2024', 'dist', 'index.html'));
});

//================ API CALLS
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = getUser(id);
    if (!user) {
        res.status(404).send({ error: `User ${id} not found`})
    }
    else {
        res.send({ data: user })
    }
})

app.get('/api/pins/:id', (req, res) => {
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
    const users = [
        {id: 1, name: "Riley", xp: 10, nextLevelXP: 20, level: 2},
        {id: 2, name: "Ryland", xp: 5, nextLevelXP: 10, level: 1},
        {id: 3, name: "Averi", xp: 2, nextLevelXP: 300, level: 5},
        {id: 4, name: "Ayren", xp: 0, nextLevelXP: 50, level: 3},
    ];
    return users.find(p => p.id == id);
}

function getPin(id) {
    const pins = [
        {id: 1, name: "Trash 1", latitude: 0, longitude: 0},
        {id: 2, name: "Trash 2", latitude: -200, longitude: 100}
    ]
    return pins.find(p => p.id == id)
}