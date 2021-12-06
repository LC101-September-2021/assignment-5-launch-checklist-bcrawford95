// Write your JavaScript code here!

window.addEventListener("load", function() {

    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";
        
    form.addEventListener("submit", function(event){
    event.preventDefault();
    
    let pilotName = document.querySelector("input[name=pilotName]");
    let pilot = pilotName.value 
    let copilotName = document.querySelector("input[name=copilotName]");
    let copilot = copilotName.value
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let fuel = Number(fuelLevel.value)
    let cargoMass = document.querySelector("input[name=cargoMass]");
    let cargo = Number(cargoMass.value)
        
    formSubmission(document, form, list, pilot, copilot, fuel, cargo);
    
    });

    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        destination = pickPlanet(listedPlanets) 

        addDestinationInfo(document, destination.name, destination.diameter, destination.star, destination.distance, destination.moons, destination.image)
    })
   
});

