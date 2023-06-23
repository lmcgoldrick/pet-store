const express = require('express');
const app = express();

app.use(express.json());

let petData = [
    {
        id: 1,
        name: "charlie",
        status: "dog"
    },
    {
        id: 2,
        name: "fluffy",
        status: "cat"
    },
    {
        id: 3,
        name: "tim",
        status: "turtle"
    }
];

app.get("/pet", (req, res) => {
    res.send("Server is up:\n\n" + petData);
});

app.get("/pet/findByStatus/:status", (req, res) => {
    let pet = petData.find(p => p.status === req.params.status);
    if (!pet) res.status(404).send("The pet with the given status was not found");
    res.send(pet);
});

app.get("/pet/findByID/:id", (req, res) => {
    let pet = petData.find(p => p.id === parseInt(req.params.id));
    if (!pet) res.status(404).send("The pet with the given ID was not found");
    res.send(pet);
});

app.post("/pet/:id/:name/:status", (req, res) => {
    let newName = req.params.name;
    let newStatus=req.params.status;
    let newID = req.params.id;
    let newPet = {
        id: newID,
        name: newName,
        status: newStatus
    };
    petData.push(newPet);
    res.send(newPet);
});

app.delete("/pet/:id", (req, res) => {
    let removeID = parseInt(req.params.id);
    let index = petData.findIndex((p) => p.id === removeID);
    if (index == -1) res.status(404).send("The pet with the given ID was not found");
    petData.splice(index, 1);
    res.send(petData);
});

app.put("/pet/:id/:name/:status", (req,res) => {
    let curID = parseInt(req.params.id);
    let newName = req.params.name;
    let newStatus = req.params.status;
    let newPet = {
        id: curID,
        name: newName,
        status: newStatus
    };
    let index = petData.findIndex((p) => p.id === curID);
    petData[index] = newPet;
    res.send(newPet);
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});