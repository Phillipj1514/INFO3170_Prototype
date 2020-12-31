//  main variables
let rooms = [];

let power_rate  = 22.75;

let total_power_cost = 0;

let totalAppliance = 0;

let total_power_use = 0;

let MostExpensiveROomIndex = 0;

let averageDeviceUse = 0;

// Main objects to use
 function Room(name){
     this.name = name;
     this.appliances = [];
     this.addAppliance =  function(appliance) {
         this.appliances.push(appliance);
         totalAppliance++;
        };

     this.removeAppliance = function(index){
        this.appliances.splice(index,1);
     };

     this.applianceIndex = function(appliance){
         return this.appliances.indexOf(appliance);
     };

 }

 function Appliance(name, consumption, hours){
     this.name = name;
     this.consumption = consumption;
     this.hours = hours;
 }

// main functions

function addRoom(room) {
    rooms.push(room);
}

function removeRoom(index){
   rooms.splice(index,1);
}

function roomIndex(room){
    return rooms.indexOf(room);
}

function generateDetail(){
    highest_power = 0;
    total_power_use = 0;
    totalAppliance = 0;
    for(let i=0; i<rooms.length; i++) {
        roomspower = 0;
        for(let j=0; j<rooms[i].appliances.length; j++) {
            roomspower += (rooms[i].appliances[j].consumption * rooms[i].appliances[j].hours);
            totalAppliance++;
        }
        roomspower*=30;
        roomspower/=1000;
        if(roomspower >= highest_power){
            highest_power = roomspower;
            MostExpensiveROomIndex = i;
        }
        total_power_use+= roomspower
    }
    averageDeviceUse = total_power_use/totalAppliance;
    total_power_cost =  total_power_use/power_rate;
}

// dummy data
addRoom(new Room("Kitchen"));
rooms[0].addAppliance(new Appliance("Stove", 800, 4));
rooms[0].addAppliance(new Appliance("Fridge", 700, 24));
rooms[0].addAppliance(new Appliance("Bulb", 100, 12));
rooms[0].addAppliance(new Appliance("Microwave", 400, 1));

addRoom(new Room("Bathroom"));
rooms[1].addAppliance(new Appliance("Bulb", 100, 12));
rooms[1].addAppliance(new Appliance("Mirror", 200, 2));