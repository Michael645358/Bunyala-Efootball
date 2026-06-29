const SUPABASE_URL =
"https://gwncuzcafdcorfenrqyr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function loadPlayers() {

const { data, error } =
await supabaseClient
.from("players")
.select("*")
.order("id");

if(error){
    console.log(error);
    return;
}

let container =
document.getElementById("adminPlayers");

container.innerHTML = "";

data.forEach(player => {

    let card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML =
    "<h3>" + player.username + "</h3>";

    container.appendChild(card);

});

}

function createTournament(){

let tournament =
document.getElementById(
"tournamentName"
).value;

document.getElementById(
"tournamentMessage"
).innerHTML =
"✅ Tournament Created: " +
tournament;

}

loadPlayers();