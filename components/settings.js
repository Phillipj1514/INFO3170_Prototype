let settings_view;

let settings_content = ``;

let settings_nav = `
<div class= "bnav" id="nav1">
    <img src="images/home.png" alt="home">
    <p>Dashboard</p>
</div>
<div class= "bnav" id="nav2">
    <img src="images/bolt.png" alt="quick predict">
    <p>Quick Predict</p>
</div>
<div class= "bnav" id="nav3">
    <img src="images/room.png" alt="settings">
    <p>Rooms</p>
</div>
`;

function loadSettings(){
    settings_view = `
        <section id="display_view">
            <div class="view_rows">
                <div class="view_row">
                    <p class="left highlight bold" id="bill_setting">Bill Calculation Method</p>
                </div>

                <div class="view_row">
                    <p class="left highlight bold">Preferemces</p>
                </div>

                <div class="dash-border"></div>

                <div class="view_row">
                    <p class="left highlight bold">Password</p>
                </div>

                <div class="view_row">
                    <p class="left highlight bold">Sign Out</p>
                </div>
            
            </div>
        </section>
`;

    prev_view = now_view
    now_view = loadSettings;
    // Set the views
    $("#back").addClass("gone");
    $("#title").html("Settings")
    $("#content").html(settings_content);
    $("#content").addClass("gone");
    $("#main").html(settings_view);
    $('#bottom_nav').html(settings_nav);

    // Set the button

    $("#nav1").click(function(){
        console.log("Dashboard");
        loadDashboard()
    });

    $("#nav2").click(function(){
        console.log("Quick Predict");
        loadQuickPredict();
    });

    $("#nav3").click(function(){
        console.log("Rooms");
        loadRooms()
    });

    $("#bill_setting").click(function(){
        billingInfo();
    });
}

function billingInfo(){
    $("#back").removeClass("gone");
    settings_view = `
    <section id="display_view">
        <div class="view_rows">
            <div class="view_row">
                <p class="left ">Standard Price Rates</p>
                <div class = "right">
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <div class="dash-border"></div> 

            <div class="view_row">
                <p class="left ">Custom Price Rates</p>
                <div class = "right">
                    <label class="switch">
                        <input type="checkbox" >
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        
        </div>
    </section>
    `;
    $("#main").html(settings_view);

    $("#back").click(function(){
        loadSettings();
    });
}