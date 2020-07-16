console.log("System online...");

var express = require('express'); // this how you import in js
//if server does not have cors enabled get requests from a different server will fail
var cors = require('cors');
var fs = require('fs');const { response } = require('express');
var heroSource = require('./Hero.js');
var app = express();
app.use(express.json());
app.use(cors());
var data = fs.readFileSync('heroes.json');
var herodata = JSON.parse(data);
var maxId;

class Hero{
    
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

var server = app.listen(3000, listening);

let heroes=[];
for(i=0;i<herodata.length;i++){
    j=herodata[i];
    h = new Hero(j.id, j.name);
    
    
    heroes.push(h);

}
const placeholder = new Hero (9999, "Placeholder");
function listening() {
    console.log("listening...");

}

app.use(express.static('public'));

app.get('/search/:flower/:num', sendFlower); //not the colon means that the flower is actually a placeholder/variable

function sendFlower(request, response){
    var data = request.params;
    var num = data.num;
    var reply ="";
    for(i=0;i<data.num;i++){
        reply += "I love " +data.flower+ " too<br>"
    }
    response.send(reply);
}

app.get('/api/heroes/:id', getSingleHero);

function getSingleHero(request, response){
    var data = request.params;
    id = data.id;
    selected = heroes[id-11]; //hacky but since ids start at 11 should be okay OR off by one? it was dear reader
    console.log("The id requested is " + id);
    response.send(selected);
};

app.get('/api/heroes', getAllHeroes);

function getAllHeroes(request, response){
    console.log("Try get all");
    console.log(heroes);
    response.send(heroes);};

app.post('/api/heroes', addHero);

function addHero(request, response){
    newName = request.body
    newid = getNewId();
    newHero = new Hero(newid, newName.name)
    heroes.push(newHero);
    var replacement = JSON.stringify(heroes);
    fs.writeFile("heroes.json", replacement, finished );
    function finished(err){console.log("New hero: "+newHero.name+" written to file")}
    reply = {"msg": "I think i added something",
"name":newHero.name,
"id":newHero.id}
    response.send(reply)
}

function getNewId(){
    if(!maxId){
        tempId=0;
        for(i=0; i<heroes.length;i++){
            if(heroes[i].id>tempId){
                tempId=heroes[i].id
            }
        }
        maxId=tempId;
    }
    maxId += 1;
    return maxId;
}

//DELETE
app.delete('/api/heroes/:id', deleteHero);

//PUT
app.put("/api/heroes", editHero);

function deleteHero(request, response){
    console.log("Deleting...");
    data = request.params;
    targetId = data.id;
    heroes = heroes.filter(h => h.id != targetId);
    var replacement = JSON.stringify(heroes);
    fs.writeFile("heroes.json", replacement, finished );
    function finished(err){console.log("Old hero: "+ targetId+" deleted from file")}

}

function editHero(request, response){
    console.log("Editing/PUT has not been implemented");
}


    
