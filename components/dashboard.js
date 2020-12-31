let dashboard_view ;

let dash_content = `
<div id="graph-select">
    <p>Daily</p> |
    <p>Weekly</p>|
    <p style="color: #B68400;">Monthly</p>
</div>
`;

let dashnav  = `
<div class= "bnav" id="nav1">
    <img src="images/room.png" alt="home">
    <p>Rooms</p>
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

function loadDashboard(){
    generateDetail();
    // most expensive room calculation
    me_power = 0;
    me_cost = 0;
    mer = rooms[MostExpensiveROomIndex];
    for(let i=0; i<mer.appliances.length; i++) {
        me_power += (mer.appliances[i].consumption * mer.appliances[i].hours);
    }
    me_power*=30;
    me_cost = me_power/power_rate;

    dashboard_view = `
        <section>
        <div id="graph">
            <img src="images/graph.png" alt="graph">
        </div>

        <div id="ebill">
            <h5>Numer Of Appliances</h5>
            <p>`+totalAppliance+`</p>
        </div>  

        <div class="dash-border"></div> 

        <div id="e-use">
            <h5>Electricity Usage</h5>
            <div id="e-use-in">
                <div>
                    <h6>Average per device</h6>
                    <p>`+averageDeviceUse+` KWH</p>
                </div>
                <div>
                    <h6>Total Power Forcast</h6>
                    <p>`+total_power_use+` KWH</p>
                </div>
            </div>

        </div> 

        <div class="dash-border"></div>

        <div id="most-e">
            <h5>Most expensive Room</h5>
            <div class="most-e-in">
                <p class = "room_top bold">`+mer.name+`</p>
                <p class = "room_top" id="view_room_btn" >View Room</p>
            </div>
            <div class="most-e-in room_det">
                <div>
                    <h6>Power Usage</h6>
                    <p>`+me_power+` KWH</p>
                </div>
                <div>
                    <h6>Cost</h6>
                    <p>$`+me_cost+`</p>
                </div>
                <div>
                    <h6>Number of appliances</h6>
                    <p>`+mer.appliances.length+`</p>
                </div>
            </div>

        </div>
        </section>
        `;

    prev_view = now_view
    now_view = loadDashboard;
    // Set the views
    $("#back").addClass("gone");
    $("#title").html("Dashboard")
    $("#content").html(dash_content);
    $("#content").removeClass("gone");
    $("#main").html(dashboard_view);
    $('#bottom_nav').html(dashnav);

    // Set the buttons
    $("#nav1").click(function(){
        console.log("Rooms");
        loadRooms()
    });

    $("#nav2").click(function(){
        console.log("Quick Predict");
        loadQuickPredict();
    });

    $("#nav3").click(function(){
        console.log("settings");
        loadSettings()
    });

    $("#view_room_btn").click(function(){
        showRoom(MostExpensiveROomIndex);
    });
    
}


