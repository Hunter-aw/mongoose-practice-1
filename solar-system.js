const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/population-practice");
const Schema = mongoose.Schema;


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

// Visitor.find({
//     name: "Jona"
// }).populate('visitedPlanets').exec((err, planets) => {
//     if (err) console.log(err);
//     else console.log(planets[0])
// })

// Planet.find({
//     name: "Pluto"
// }).populate('visitors', "name -_id").exec((err, visitors) => {
//     if (err) console.log(err);
//     else console.log(visitors[0])
// })


// SolarSystem.findOne({}, (err, system) => {
//     system.populate({
//             path: 'planets',
//             populate: {
//                 path: ('visitors')
//             }
//         },
//         () => {
//             console.log(system.planets)
//         }
//     )
// })

// Visitor.findOne({name: 'Hunter'}).populate({
//     path: 'homePlanet',
//     populate: {
//         path: 'system'
//     }
// }).exec((err, visitor) => {
//     if(err) throw err;
//     else console.log(visitor.homePlanet.system.starName)
// })

Planet.findOne({
    name: 'Saturn'
}).populate('system visitors').exec((err, planet) => {
    if (err) throw err;
    else console.log(`Saturn's star is ${planet.system.starName} and ${planet.visitors[0].name} is currently on saturn`)
})