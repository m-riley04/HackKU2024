const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('hack-ku-2024/dist'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on port " + port);
});

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

function getUser(id) {
    const users = [
        {id: 1, name: "Riley"}
    ];

    return users.find(p => p.id == id);
}