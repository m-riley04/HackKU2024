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

const PROJECT_NAME = "hackku2024";
const DATASET_NAME = "hackku_dataset";

const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId: PROJECT_NAME,
    keyFilename: "./bigquerycreds.json"
});

/**
 * Inserts all rows from a specific BigQuery table.
 * 
 * @param {string} datasetId - The ID of the dataset.
 * @param {string} tableId - The ID of the table.
 * @param {object[]} rows - The rows to insert 
 */

async function insertData(datasetId, tableId, rows) {
    try {
        const dataset = bigquery.dataset(datasetId);
        const table = dataset.table(tableId);
        const [insertResponse] = await table.insert(rows);
        console.log('Insert response:', insertResponse);
    } catch (error) {
        console.error('ERROR:', error);
    }
}

/**
 * Deletes all rows from a specific BigQuery table.
 * 
 * @param {string} datasetId - The ID of the dataset.
 * @param {string} tableId - The ID of the table.
 */
async function wipeData(datasetId, tableId) {
    const query = `DELETE FROM \`${bigquery.projectId}.${datasetId}.${tableId}\` WHERE TRUE`;
    try {
        const [job] = await bigquery.createQueryJob({ query });
        await job.getQueryResults();  // Wait for the query to finish
        console.log(`All rows have been deleted from ${tableId}.`);
    } catch (error) {
        console.error(`Failed to delete data from ${tableId}:`, error);
        throw error;
    }
}

async function updateData(datasetId, tableId, conditions, updates) {
    const query = `
        UPDATE \`${bigquery.projectId}.${datasetId}.${tableId}\`
        SET ${Object.keys(updates).map(key => `${key} = @${key}`).join(', ')}
        WHERE ${Object.keys(conditions).map(key => `${key} = @${key}`).join(' AND ')}`;

    const params = {...updates, ...conditions};

    const options = {
        query: query,
        location: 'US',  // This should be set to your dataset's location
        params: params
    };

    try {
        const [job] = await bigquery.createQueryJob(options);
        await job.getQueryResults();
        console.log(`Update successful in table ${tableId}`);
    } catch (error) {
        console.error(`Failed to update data in ${tableId}:`, error);
        console.error(`Detailed Error: ${error.response?.body || error.message}`);
        throw error;
    }
}

//================ API CALLS
//==== GET
app.get(`/api/users/:id`, async (req, res) => {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.users\` WHERE id = @id`;
    const options = {
        query: query,
        params: {id: id},
        location: 'US',
    };

    try {
        const [rows] = await bigquery.query(options);
        if (rows.length === 0) {
            res.status(404).send({ error: `User ${id} not found` });
        } else {
            res.send({ data: rows[0] });
        }
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch user from BigQuery' });
    }
});


app.get(`/api/users`, async (req, res) => {
    try {
        const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.users\``;
        const options = {
            query: query,
            location: 'US',  // Set this to your dataset's location
        };

        const [rows] = await bigquery.query(options);
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch users from BigQuery' });
    }
});

app.get(`/api/pins`, async (req, res) => {
    const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.pins\``;
    const options = {
        query: query,
        location: 'US',
    };

    try {
        const [rows] = await bigquery.query(options);
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch pins from BigQuery' });
    }
});

app.get(`/api/pins/:id`, async (req, res) => {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.pins\` WHERE id = @id`;
    const options = {
        query: query,
        params: {id: id},
        location: 'US',
    };

    try {
        const [rows] = await bigquery.query(options);
        if (rows.length === 0) {
            res.status(404).send({ error: `Pin ${id} not found` });
        } else {
            res.send({ data: rows[0] });
        }
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch pin from BigQuery' });
    }
});

app.get(`/api/facts`, async (req, res) => {
    const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.facts\``;
    const options = {
        query: query,
        location: 'US',
    };

    try {
        const [rows] = await bigquery.query(options);
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch facts from BigQuery' });
    }
});

app.get(`/api/facts/:material`, async (req, res) => {
    const material = req.params.material;
    const query = `SELECT * FROM \`${PROJECT_NAME}.${DATASET_NAME}.facts\` WHERE material = @material`;
    const options = {
        query: query,
        params: {material: material},
        location: 'US',
    };

    try {
        const [rows] = await bigquery.query(options);
        if (rows.length === 0) {
            res.status(404).send({ error: `${material} facts not found` });
        } else {
            res.send({ data: rows });
        }
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send({ error: 'Failed to fetch facts from BigQuery' });
    }
});
//====== PUT
/**
 * Update user data in BigQuery.
 */
app.put('/api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);  // ID from the URL
    const updates = req.body;  // Data passed in the body of the request

    // Construct the conditions to match the user
    const conditions = { id: id };

    try {
        await updateData(DATASET_NAME, 'users', conditions, updates);
        res.send({ success: true, message: 'User updated successfully.' });
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).send({ error: 'Failed to update user data in BigQuery.' });
    }
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