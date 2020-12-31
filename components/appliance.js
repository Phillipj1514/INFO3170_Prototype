let appliance_view = `
`;

let appliance_nav = `
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

let appliance_content = ` <img id="menu" src="images/menu.png" alt="menu">`;

let cur_appliance_index;

function loadAppliance(){
    prev_view = now_view;
    now_view = loadRooms;
    room_indx = cur_room_index;
    // Set the views
    $("#back").removeClass("gone");
    $("#title").html("Rooms")
    $("#content").html(appliance_content);
    $("#content").removeClass("gone");
    $("#main").html(appliance_view);
    $('#bottom_nav').html(appliance_nav);
    
    // Set the buttons
    $("#back").click(function(){
        console.log("previews");
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
        loadSettings()
    });

    $("#menu").click(function(){
        showAppliancePopUp(); 
     });
}

function loadAddAppliance(){
    appliance_view = `
    <section id="form">
        <h5 id="form_title">New Appliance</h5>
        <div class="form_field">
            <input type="text" id="a_name_field"  placeholder="Enter appliance name" name="Appliance" class="form_input"><br>
            <div class="form_label">
                <p>Type</p>
            </div>
        </div>

        <div class="form_field">
            <input type="text" id="a_consumption_field"  placeholder="Enter device consumption" name="Consumption" class="form_input"><br>
            <div class="form_label">
                <p>Watts</p>
            </div>
        </div>

        <div class="form_field">
            <input type="text" id="a_time_field"  placeholder="Enter daily hours used" name="Time" class="form_input"><br>
            <div class="form_label">
                <p>Hours</p>
            </div>
        </div>
        <div class="form_field f_btn">
            <p id="form_btn">Save</p>
        </div>

    </section>
    `;

    loadAppliance()
    $("#content").addClass("gone");

    $("#form_btn").click(function(){
        let name = $("#a_name_field").val();
        let consumption =  $("#a_consumption_field").val();
        let hours = $("#a_time_field").val();
        rooms[cur_room_index].addAppliance( new Appliance(name, consumption, hours));
        prev_view(cur_room_index);
    });
}

function showAppliance(index){
    cur_appliance_index = index;
    let cur_appliance = rooms[cur_room_index].appliances[index];
    let name = cur_appliance.name;
    let consump = cur_appliance.consumption;
    let hours = cur_appliance.hours;
    let tot_power = (consump*hours);
    tot_power *= 30;
    tot_power /= 500;
    let tot_cost = tot_power/power_rate;

    appliance_view = `
    <section id="display_view">
        <div class="gone" id="popup">
            <div  id="overlay"></div>
            <div id="overlay_menu">
                <p id="om_edit_app">Edit</p>
                <p id="om_del_app">Delete</p>
            </div> 
        </div>
        <h5 id="view_title">`+name+`</h5>

        <div class="view_rows">
            <div class="view_row">
                <p class="left">Total Power Consumption</p>
                <p class="right" id="ap_tot_consump">`+ Math.round(tot_power)+` KWH</p>
            </div>

            <div class="view_row">
                <p class="left">Consumption</p>
                <p class="right" id="ap_consump">`+consump+` Watts</p>
            </div>

            <div class="view_row">
                <p class="left">Total Cost</p>
                <p class="right" id="ap_cost">$`+ Math.round(tot_cost)+`</p>
            </div>

            <div class="view_row">
                <p class="left">Avg. Time On</p>
                <p class="right" id="ap_hour">`+hours+` Hours</p>
            </div>
        
        </div>
    </section>
    `;
    loadAppliance()
}


function showAppliancePopUp(){
    $("#popup").removeClass("gone");
    $("#overlay").click(function(){
        $("#popup").addClass("gone");
    });

    $("#om_del_app").click(function(){
        rooms[cur_room_index].removeAppliance(cur_appliance_index);
        prev_view()
    });

}