const { reporters } = require('mocha');
const mongoose = require('mongoose');

//  Your code goes here

var marioModel = new mongoose.Schema(
  {
    name: {
      type: String
    },
    weight: {
      type: Number
    }
  },
  {
    marioModel : {
    type : String
    }
  },
  {
  mariochar: {
    type: String
  }
  }
);

app.get('/mario', async(req,res) => {
  res.send(await marioModel.find());
})

app.get('/mario/:id', async(req,res) => {
  const id = req.params.id;
  try{
  res.send(await marioModel.findById(id));
  } catch (e) {
    res.status(400).send({message: e.message});
  }
});

const isNullOrUndefined = val => val === null || val === undefined;

app.post('/mario', async(req,res) => {
  const newMario = req.body;
  if(isNullOrUndefined(newMario.name) || isNullOrUndefined(newMario.weight)){
    res.status(201).send({message: "either name or weight is missing"});
  }  else {
    const newMarioDocument = new marioModel(newMario);
    await newMarioDocument.save();
    res.send(newMarioDocument);
  }
});

app.patch('/mario/:id', async(req,res) => {
  const id = req.params.id;
  const newMario = req.body;
  try{
    const existingMarioDoc = await marioModel.findById(id);
    if( isNullOrUndefined(newMario.name)&& isNullOrUndefined(newMario.weight)){
      res.status(400).send({message: "both name and weight is missing"});
    } else {
      if(!isNullOrUndefined(newMario.name)) {
        existingMarioDoc.name = newMario.name;
      }
      if(!isNullOrUndefined(newMario.weight)) {
        existingMarioDoc.weight = newMario.weight;
      }
      await existingMarioDoc.save();
      res.send(existingMarioDoc);
    }
  }
   catch (e) {
    res.status(400).send({message: e.message});
  }
});

module.exports = marioModel;