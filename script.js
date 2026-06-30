const SUPABASE_URL = "https://gwncuzcafdcorfenrqyr.supabase.co";
const SUPABASE_KEY = "sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

function joinTournament() {
    alert("Tournament registration is open!");
}

async function registerPlayer() {

    let username =
    document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Enter a username");
        return;
    }

    const { error } =
    await supabaseClient
    .from("players")
    .insert([
        {
            username: username
        }
    ]);

    if (error) {
        alert("Registration failed");
        console.log(error);
        return;
    }

    document.getElementById("message").innerHTML =
    "✅ " + username + " registered successfully!";

    document.getElementById("username").value = "";

    loadPlayers();
}

async function loadPlayers() {

    const { data, error } =
    await supabaseClient
    .from("players")
    .select("*")
    .order("id");

    if (error) {
        console.log(error);
        return;
    }

    let playersList =
    document.getElementById("playersList");

    if (!playersList) return;

    playersList.innerHTML = "";

    data.forEach(player => {

        let card =
        document.createElement("div");

        card.className = "card";
        card.textContent = player.username;

        playersList.appendChild(card);

    });
}

async function loadTournament() {

    const { data, error } =
    await supabaseClient
    .from("tournaments")
    .select("*")
    .order("id", { ascending: false });

    if (error) {
        console.log(error);
        return;
    }

    let container =
    document.getElementById("tournamentDisplay");

    if (!container) return;

    if (data.length === 0) {
        container.innerHTML =
        "No tournament available";
        return;
    }

    let tournament = data[0];

    container.innerHTML =
    "<div class='card'>" +
    "<h3>" + tournament.title + "</h3>" +
    "<p>Entry Fee: KSh " +
    tournament.entry_fee +
    "</p>" +
    "<p>Prize Pool: KSh " +
    tournament.prize_pool +
    "</p>" +
    "</div>";
}

loadPlayers();
loadTournament();