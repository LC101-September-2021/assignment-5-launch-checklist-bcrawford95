// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let div = document.getElementById("missionTarget"); 
    div.innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
             <li>Name: ${name}</li>
             <li>Diameter: ${diameter}</li>
             <li>Star: ${star}</li>
             <li>Distance from Earth: ${distance}</li>
             <li>Number of Moons: ${moons}</li>
          </ol>
          <img src="${imageUrl}">
          `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    };
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    list = document.querySelector("#faultyItems");
    pilot = document.querySelector("input[name=pilotName]").value;
    copilot = document.querySelector("input[name=copilotName]").value;
    fuelLevel = document.querySelector("input[name=fuelLevel]").value;
    cargoMass = document.querySelector("input[name=cargoMass]").value;
    faultyItems = "";
    pilotStatus = "";
    copilotStatus = "";
    fuelStatus = "";
    cargoStatus = "";
    invalidEntry = "";
    allFieldsRequired = "";
    launchStatus = "" ;
    
    if (validateInput(pilot) === "Empty" || 
        validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || 
        validateInput(cargoMass) === "Empty")
    {
        allFieldsRequired = "All fields are required";
        alert(allFieldsRequired);
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number"){
        invalidEntry = "Invalid Entry";
        alert(invalidEntry);
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        invalidEntry = "Invalid Entry";
        alert(invalidEntry);
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} Ready`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} Ready`;
        if (fuelLevel < 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low to launch";
            list.style.visibility = "visible";
            fuelStatus = "Fuel level too low for launch";
            alert(fuelStatus);
        } else if (cargoMass > 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo too heavy to launch";
            list.style.visibility = "visible";
            cargoStatus = "Cargo too heavy to launch";
            alert(cargoStatus);     
        } else if (cargoMass > 10000 && fuelLevel < 10000){
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo too heavy to launch";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
            list.style.visibility = "visible";
            fuelStatus = "Fuel level too low for launch";
            alert(fuelStatus);
            cargoStatus = "Cargo too heavy to launch";
            list.style.visibility = "visible";
            alert(cargoStatus);
        } else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            list.style.visibility = "visible";
            document.getElementById("launchStatus").style.color ="green";
        } 
    } 
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return (response.json());
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.round(Math.random()*5);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
