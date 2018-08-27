const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/population-practice");
const Schema = mongoose.Schema;

//...........................................SCHEMA & MODELS................................//
const solarSystemSchema = new Schema({
    planets: [{
        type: Schema.Types.ObjectId,
        ref: 'planet'
    }],
    starName: String
})
const SolarSystem = mongoose.model('system', solarSystemSchema)

const planetSchema = new Schema({
    name: String,
    system: {
        type: Schema.Types.ObjectId,
        ref: 'system'
    },
    visitors: [{
        type: Schema.Types.ObjectId,
        ref: 'visitors'
    }]
})
const Planet = mongoose.model('planet', planetSchema)

const visitorSchema = new Schema({
    name: String,
    homePlanet: {
        type: Schema.Types.ObjectId,
        ref: 'planet'
    },
    visitedPlanets: [{
        type: Schema.Types.ObjectId,
        ref: 'planet'
    }]
})
const Visitor = mongoose.model('visitors', visitorSchema)


//................................INSTANCES.........................................//

let milkyWay = new SolarSystem({
    starName: "Sun",
    planets: []
})

let pluto = new Planet({
    name: "Pluto",
    system: milkyWay,
    visitors: []
})

let saturn = new Planet({
    name: "Saturn",
    system: milkyWay,
    visitors: []
})

let uranus = new Planet({
    name: "Uranus",
    system: milkyWay,
    visitors: []
})

let hunter = new Visitor({
    name: "Hunter",
    homePlanet: saturn,
    visitedPlanets: []
})

let jona = new Visitor({
    name: "Jona",
    homePlanet: uranus,
    visitedPlanets: []
})

let meesh = new Visitor({
    name: "Meesh",
    homePlanet: saturn,
    visitedPlanets: []
})

//........................................SAVE TO DB.............................//

// milkyWay.planets.push(pluto, saturn, uranus)
// milkyWay.save()
// pluto.visitors.push(hunter, jona)
// pluto.save()
// saturn.visitors.push(jona)
// saturn.save()
// uranus.visitors.push(meesh)
// uranus.save()
// hunter.visitedPlanets.push(pluto)
// hunter.save()
// jona.visitedPlanets.push(pluto, saturn)
// jona.save()
// meesh.visitedPlanets.push(uranus)
// meesh.save()


//......................................TASKS........................................//

//                                   Find a visitor's list of visited planets

Visitor.findOne({
    name: "Jona"
}).populate('visitedPlanets', 'name -_id').exec((err, visitor) => {
    if (err) console.log(err);
    else console.log(`Jona has visited ${visitor.visitedPlanets[0].name} and ${visitor.visitedPlanets[1].name}`)
})

//                                    Find all the visitors on a planet

Planet.findOne({
    name: "Pluto"
}).populate('visitors', "name -_id").exec((err, planet) => {
    if (err) console.log(err);
    else console.log(`${planet.visitors[0].name} and ${planet.visitors[1].name} are currently visiting Pluto`)
})

//                                   Find all the visitors in a system (subdocuments!)

SolarSystem.findOne({}, (err, system) => {
    system.populate({
            path: 'planets',
            populate: {
                path: 'visitors'
            }
        },
        () => {
            let uniqueVisitors = []
            let message = ""
            let planets = system.planets
            for (planet of planets) {
                let visitors = planet.visitors
                for (visitor of visitors) {
                    if (uniqueVisitors.indexOf(visitor.name)) {
                        uniqueVisitors.push(visitor.name)
                        message += (visitor.name + ", ")
                    }
                } 
            } 
            message += "are visiting the Milky Way"
            console.log(message)
        }
    )
})

//                                 Find the name of the star in the system of a visitor's home planet

Visitor.findOne({name: 'Hunter'}).populate({
    path: 'homePlanet',
    populate: {
        path: 'system'
    }
}).exec((err, visitor) => {
    if(err) throw err;
    else console.log(`The Star in the system of hunter's home planet is the ${visitor.homePlanet.system.starName}`)
})

//                                    Find a planet's system's star name as well as its visitors

Planet.findOne({
    name: 'Saturn'
}).populate('system visitors').exec((err, planet) => {
    if (err) throw err;
    else console.log(`Saturn's star is ${planet.system.starName} and ${planet.visitors[0].name} is currently on saturn`)
})