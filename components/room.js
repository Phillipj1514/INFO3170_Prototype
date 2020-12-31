let room_view = `
`;

let room_nav = `
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

let room_content = ` <img id="menu" src="images/menu.png" alt="menu">`;

let cur_room_index = 0;

function loadRoom(){
    prev_view = now_view;
    now_view = loadRooms;
    // Set the views
    $("#back").removeClass("gone");
    $("#title").html("Rooms")
    $("#content").html(room_content);
    $("#content").removeClass("gone");
    $("#main").html(room_view);
    $('#bottom_nav').html(room_nav);
    
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
    
    $("#menu").click(function(){
       showRoomPopUp(); 
    });
}

function loadAddRoom(){
    room_view = `
    <section id="form">
        <h5 id="form_title">New Room</h5>

        <div class="form_field">
            <input type="text" id="r_name_field" placeholder="Enter room name" name="Room" class="form_input">
            
        </div>

        <div class="form_field f_btn">
            <p id="form_btn">Save and Add Appliance</p>
        </div>

    </section>
    `;

    loadRoom()

    $("#form_btn").click(function(){
        let name = $("#r_name_field").val();
        let n_room = new Room(name);
        addRoom(n_room);
        cur_room_index = roomIndex(n_room);
        loadAddAppliance();
    });
}

function showRoom(index){
    let appliance_list ="";
    cur_room_index = index;
    let cur_room = rooms[index];
    let room_name = cur_room.name;
    let cur_appliances = cur_room.appliances;
    let appliance_ids = []
    let tot_power = 0;
    let tot_cost = 0;

    room_view = `
    <section>
        <div class="gone" id="popup">
            <div  id="overlay"></div>
            <div id="overlay_menu">
                <p id="om_add_app">Add Appliance</p>
                <p>Rename</p>
                <p id="om_del">Delete</p>
            </div> 
        </div>
        
        <div id="r_head">
            <h5>`+room_name+`</h5>
            <div>
                <div class="r_head_row">
                    <p class="left">Total Power Consumption</p>
                    <p class="right" id="r_head_pc">20kwh</p>
                </div>
                <div class="r_head_row">
                    <p class="left">Total Cost</p>
                    <p class="right" id="r_head_cost">$1300</p>
                </div>
            </div>
        </div>
        <div id="r_head_separator"></div>
        <div id="appliance_list">
        </div>
    </section>
    `;
    loadRoom()
    // now_view = showRoom;
    
    for(let i=0; i<cur_appliances.length; i++) {
        let name = cur_appliances[i].name;
        let consump = cur_appliances[i].consumption;
        let hours = cur_appliances[i].hours;

        appliance_list +=`
        <div class="ap_summary"  id="a`+i+`">
            <h6> `+name+`</h6>
            <div>
                <p>Consumption</p>
                <p class="right" >`+consump+`KWH</p>
            </div>
            <div>
                <p >Avg. Time On</p>
                <p class="right" >`+hours+` hours</p>
            </div>
        </div>
        `;

        appliance_ids.push("#a"+i);
        tot_power += (consump*hours);
    }
    tot_cost = (tot_power*30)/power_rate;
    $("#appliance_list").html(appliance_list);
    $("#r_head_pc").html(tot_power+" KWH");
    $("#r_head_cost").html("$"+tot_cost);

    for(let k=0; k<appliance_ids.length ; k++) {
        $(appliance_ids[k]).click(function(){
            showAppliance(k);
            console.log("click");
        });
    }
}

function showRoomPopUp(){
    $("#popup").removeClass("gone");
    $("#overlay").click(function(){
        $("#popup").addClass("gone");
    });

    $("#om_add_app").click(function(){
        console.log("add_app");
        loadAddAppliance();
    });

    $("#om_del").click(function(){
        removeRoom(cur_room_index);
        prev_view()
    });

}