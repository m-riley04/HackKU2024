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

//================ PLACEHOLDER DATA
const users = [
    {id: 0, name: "John", xp: 0, nextLevelXP: 10, level: 1, trashCollected: 0},
    {id: 1, name: "Riley", xp: 10, nextLevelXP: 20, level: 2, trashCollected: 100},
    {id: 2, name: "Ryland", xp: 5, nextLevelXP: 10, level: 1, trashCollected: 87},
    {id: 3, name: "Averi", xp: 2, nextLevelXP: 300, level: 5, trashCollected: 169},
    {id: 4, name: "Aryen", xp: 0, nextLevelXP: 50, level: 3, trashCollected: 123},
];

const pins = [
    {id: 0, name: "Trash 1", latitude: 0, longitude: 0},
    {id: 1, name: "Trash 2", latitude: -200, longitude: 100}
];

const facts = [
    {id: 0, material: "glass", body: "Beaches are being depleted of sand, but recycled glass can help replenish them."},
    {id: 1, material: "glass", body: "One ton of recycled glass saves around 315 kilograms of carbon dioxide emission."},
    {id: 2, material: "glass", body: "It takes one glass bottle around 1 million years to decompose."},
    {id: 3, material: "glass", body: "The amount of glass bottles thrown away is enough to fill up the empire state building every 3 weeks."},
    {id: 4, material: "plastic", body: "Around 2.5 million plastic bottles are thrown away every hour in America."},
    {id: 5, material: "plastic", body: "By 2050, there will be more plastic than fish in the ocean "},
    {id: 6, material: "plastic", body: "Plastic contributes to around 19% of global carbon emissions."},
    {id: 7, material: "plastic", body: "Around 2,000 garbage trucks worth of plastic are dumped into bodies of water every day."},
    {id: 8, material: "plastic", body: "Plastic littering has a very large carbon footprint."},
    {id: 9, material: "paper", body: "Paper is the most recycled material."},
    {id: 10, material: "paper", body: "Recycling one ton of paper saves around 7,000 gallons of water."},
    {id: 11, material: "paper", body: "Using recycled paper saves around 31% more energy than 'new' paper."},
    {id: 12, material: "paper", body: "Paper makes up around 33% of garbage output."},
    {id: 13, material: "other", body: "Around 9 billion tons of litter ends up in the ocean in a year."},
    {id: 14, material: "other", body: "There is around 152 pieces of litter for every household in the US."},
    {id: 15, material: "other", body: "Litter is set on fire to easy dispose of it, this leads to toxins that contribute to climate change."},
    {id: 16, material: "other", body: "The US is the number one country for litter."},
];

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

app.get(`/api/facts`, (req, res) => {
    if (!facts) {
            res.status(404).send({ error: `Facts not found`})
    }
    else {
        res.send({ data: facts })
    }
})

app.get(`/api/facts/:material`, (req, res) => {
    const material = req.params.material;
    const materialFacts = getMaterialFacts(material);
    if (!materialFacts) {
        res.status(404).send({ error: `${material} not found`})
    }
    else {
        res.send({ data: materialFacts })
    }
})

//================ SERVER FUNCTIONS
function getUser(id) {
    return users.find(p => p.id == id);
}

function getPin(id) {
    return pins.find(p => p.id == id);
}

function getMaterialFacts(material) {
    const filtered = facts.filter(f => f.material == material);
    if (filtered.length > 0) return filtered;
    return facts.filter(f => f.material == "other")
}