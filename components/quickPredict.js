let quickpredict_view ;

let quickpredict_nav = `
<div class= "bnav" id="nav1">
    <img src="images/home.png" alt="home">
    <p>Dashboard</p>
</div>
<div class= "bnav" id="nav2">
    <img src="images/room.png" alt="quick predict">
    <p>Rooms</p>
</div>
<div class= "bnav" id="nav3">
    <img src="images/settings.png" alt="settings">
    <p>Settings</p>
</div>
`;

let quickpredict_content = ``;

function loadQuickPredict(){

    quickpredict_view = `
    <section id="form">
        <h5 id="form_title">Prospective Appliance</h5>

        <div class="form_field">
            <input type="text" id="qp_consumption_field"  placeholder="Enter device consumption" name="Consumption" class="form_input"><br>
            <div class="form_label">
                <p>Watts</p>
            </div>
        </div>

        <div class="form_field">
            <input type="text" id="qp_time_field"  placeholder="Enter daily hours used" name="Time" class="form_input"><br>
            <div class="form_label">
                <p>Hours/Day</p>
            </div>
        </div>
        <div class="form_field f_btn">
            <p id="form_btn" class="qp_btn">Predict</p>
        </div>

    </section>
    `;
    prev_view = now_view
    now_view = loadQuickPredict;
    // Set the views
    $("#back").addClass("gone");
    $("#title").html("Quick Predict")
    $("#content").html(quickpredict_content);
    $("#content").addClass("gone");
    $("#main").html(quickpredict_view);
    $('#bottom_nav').html(quickpredict_nav);

    // Set the button

    $("#nav1").click(function(){
        console.log("Dashboard");
        loadDashboard()
    });

    $("#nav2").click(function(){
        console.log("Rooms");
        loadRooms();
    });

    $("#nav3").click(function(){
        console.log("settings");
        loadSettings()
    });

    $("#form_btn").click(function(){
        showPredict();
    });
    
}

function showPredict(){
    generateDetail();

    let consumption = $("#qp_consumption_field").val();
    let hours = $("#qp_time_field").val();

    let Monthly_use = (consumption*hours);
    Monthly_use *= 30;
    Monthly_use /=  500;
    let monthly_cost = Monthly_use/power_rate;
    let new_bill = total_power_cost + monthly_cost;

    quickpredict_view = `
    <section id="display_view">
        <h5 id="view_title">Prospective Appliance</h5>

        <div class="view_rows">
            <div class="view_row">
                <p class="left">Monthly Usage</p>
                <p class="right">`+Monthly_use+` Watts</p>
            </div>

            <div class="view_row">
                <p class="left">Monthly Cost</p>
                <p class="right" >$`+ Math.round(monthly_cost)+`</p>
            </div>

            <div class="view_row">
                <p class="left">New Bill Estimate</p>
                <p class="right" >$`+ Math.round(new_bill)+`</p>
            </div>

            <div class="form_field f_btn">
                <p id="form_btn" class="qp_btn">New Predict</p>
            </div>
        </div>
    </section>
    `;

    $("#main").html(quickpredict_view);
    $("#form_btn").click(function(){
        loadQuickPredict();
    });
}