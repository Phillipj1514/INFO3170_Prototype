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
    averageDeviceUse = Math.round(total_power_use/totalAppliance);
    total_power_cost = total_power_use/power_rate;
}

// dummy data
addRoom(new Room("Kitchen"));
rooms[0].addAppliance(new Appliance("stove", 10, 10))
rooms[0].addAppliance(new Appliance("fridge", 12, 10))
rooms[0].addAppliance(new Appliance("bulb", 2, 20))
rooms[0].addAppliance(new Appliance("mirror", 16, 23))

addRoom(new Room("Bathroom"));
rooms[1].addAppliance(new Appliance("bulb", 2, 20))
rooms[1].addAppliance(new Appliance("mirror", 16, 23))