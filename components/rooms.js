let rooms_view = `
<section>
    <div id="rooms_list">
        
    </div>
    <div id="rooms_est_bill">
        <p>Estimated Bill</p>
        <p id="est_bill_amt">$1000</p>
    </div>
    <div id="add_btn">
        <img src="images/add.png" alt="add">
    </div>
</section> 
`;

let rooms_nav = `
<div class= "bnav" id="nav1">
    <img src="images/home.png" alt="home">
    <p>Dashboard</p>
</div>
<div class= "bnav" id="nav2">
    <img src="images/bolt.png" alt="quick predict">
    <p>Quick Predict</p>
</div>
<div class= "bnav" id="nav3">
    <img src="images/settings.png" alt="settings">
    <p>Settings</p>
</div>
`;

let rooms_content = ` <img id="menu" src="images/menu.png" alt="menu">`;

let room_summary_template = `
<div class="room_summary">
    <div>
        <p class=" left">RRRR</p>
        <p class=" right">Usage Cost/Month</p>
    </div>
    <div>
        <p class=" left">test</p>
        <p class=" right">$3200</p>
    </div>
</div>
`;
function loadRooms(){
    prev_view = now_view
    now_view = loadRooms;
    // Set the views
    $("#back").addClass("gone");
    $("#title").html("Rooms")
    $("#content").html(rooms_content);
    $("#content").removeClass("gone");
    $("#main").html(rooms_view);
    $('#bottom_nav').html(rooms_nav);
    
    // Set the buttons
    $("#back").click(function(){
        console.log("preview");
        prev_view();
    });

    $("#nav1").click(function(){
        console.log("Dashboard");
        loadDashboard();
    });

    $("#nav2").click(function(){
        console.log("Quick Predict");
        loadQuickPredict();
    });

    $("#nav3").click(function(){
        console.log("settings");
        loadSettings();
    });

    $("#add_btn").click(function(){
        loadAddRoom();
    });

    // Display contents
    displayRooms();
}

function displayRooms(){
    rooms_summary="";
    total = 0
    buttons_ids = [];
    for(let i=0; i<rooms.length; i++) {
        let name = rooms[i].name;
        let appliances = "";
        let cost = 0
        for(let j=0; j<rooms[i].appliances.length ; j++) {
            if(j <= 2){
                appliances+= rooms[i].appliances[j].name + ", ";
            }
            
            cost += (rooms[i].appliances[j].consumption * rooms[i].appliances[j].hours);
        }
        cost*= 30;
        cost/= 500;
        cost =  (cost /power_rate)+ (445.39/ totalAppliance) + ((cost/power_rate)*0.107);
        total +=  cost
        

        rooms_summary += `
        <div class="room_summary" id="r`+i+`">
            <div>
                <p class="left">`+name+`</p>
                <p class="right">Usage Cost/Month</p>
            </div>
            <div>
                <p class="left">`+appliances+`</p>
                <p class="right">$`+ Math.round(cost)+`</p>
            </div>
        </div>
        `;

        buttons_ids.push("#r"+i)
     }
     total_power_cost = total;

     $("#rooms_list").html(rooms_summary);
     $("#est_bill_amt").html("$"+ Math.round(total_power_cost));

     for(let k=0; k<buttons_ids.length ; k++) {
        $(buttons_ids[k]).click(function(){
            showRoom(k);
        });
     }

}
