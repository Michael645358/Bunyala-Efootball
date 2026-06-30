if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const SUPABASE_URL =
"https://gwncuzcafdcorfenrqyr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// LOAD PLAYERS
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

    let container =
    document.getElementById("adminPlayers");

    if (!container) return;

    container.innerHTML = "";

    data.forEach(player => {

        let card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML =
        "<h3>" + player.username + "</h3>" +
        "<button onclick='deletePlayer(" +
        player.id +
        ")'>Remove</button>";

        container.appendChild(card);

    });
}

// DELETE PLAYER
async function deletePlayer(id) {

    const confirmDelete =
    confirm("Remove this player?");

    if (!confirmDelete) return;

    const { error } =
    await supabaseClient
    .from("players")
    .delete()
    .eq("id", id);

    if (error) {
        alert("Failed to remove player");
        console.log(error);
        return;
    }

    loadPlayers();
}

// CREATE TOURNAMENT
async function createTournament() {

    let title =
    document.getElementById("tournamentName").value;

    let entryFee =
    document.getElementById("entryFee").value;

    let prizePool =
    document.getElementById("prizePool").value;

    const { error } =
    await supabaseClient
    .from("tournaments")
    .insert([
        {
            title: title,
            entry_fee: entryFee,
            prize_pool: prizePool
        }
    ]);

    if (error) {
        console.log(error);
        alert("Failed to create tournament");
        return;
    }

    document.getElementById(
        "tournamentMessage"
    ).innerHTML =
    "✅ Tournament Created";

    document.getElementById(
        "tournamentName"
    ).value = "";

    document.getElementById(
        "entryFee"
    ).value = "";

    document.getElementById(
        "prizePool"
    ).value = "";

    loadTournaments();
}

// LOAD TOURNAMENTS
async function loadTournaments() {

    const { data, error } =
    await supabaseClient
    .from("tournaments")
    .select("*")
    .order("id");

    if (error) {
        console.log(error);
        return;
    }

    let container =
    document.getElementById(
        "tournamentsList"
    );

    if (!container) return;

    container.innerHTML = "";

    data.forEach(tournament => {

        let card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML =
        "<h3>" + tournament.title + "</h3>" +
        "<p>Fee: KSh " +
        tournament.entry_fee +
        "</p>" +
        "<p>Prize: KSh " +
        tournament.prize_pool +
        "</p>" +
        "<button onclick='deleteTournament(" +
        tournament.id +
        ")'>Delete</button>";

        container.appendChild(card);

    });
}

// DELETE TOURNAMENT
async function deleteTournament(id) {

    const confirmDelete =
    confirm("Delete tournament?");

    if (!confirmDelete) return;

    const { error } =
    await supabaseClient
    .from("tournaments")
    .delete()
    .eq("id", id);

    if (error) {
        console.log(error);
        alert("Failed to delete tournament");
        return;
    }

    loadTournaments();
}

async function createFixture() {

    let player1 =
    document.getElementById("player1").value;

    let player2 =
    document.getElementById("player2").value;

    const { error } =
    await supabaseClient
    .from("fixtures")
    .insert([
        {
            player1: player1,
            player2: player2
        }
    ]);

    if(error){
        alert("Failed to create fixture");
        console.log(error);
        return;
    }

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";

    loadFixtures();
}

async function loadFixtures() {

    const { data, error } =
    await supabaseClient
    .from("fixtures")
    .select("*")
    .order("id");

    if(error){
        console.log(error);
        return;
    }

    let container =
    document.getElementById("fixturesAdminList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(fixture => {

        let card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML =
        fixture.player1 +
        " 🆚 " +
        fixture.player2 +
        "<br><br>" +
        "<button onclick='deleteFixture(" +
        fixture.id +
        ")'>Delete</button>";

        container.appendChild(card);

    });
}

async function deleteFixture(id) {

    const confirmDelete =
    confirm("Delete fixture?");

    if(!confirmDelete) return;

    const { error } =
    await supabaseClient
    .from("fixtures")
    .delete()
    .eq("id", id);

    if(error){
        console.log(error);
        return;
    }

    loadFixtures();
}
async function addLeaderboard() {

    let username =
    document.getElementById(
        "leaderboardUsername"
    ).value;

    let points =
    document.getElementById(
        "leaderboardPoints"
    ).value;

    const { error } =
    await supabaseClient
    .from("leaderboard")
    .insert([
        {
            username: username,
            points: points
        }
    ]);

    if(error){
        alert("Failed to add player");
        console.log(error);
        return;
    }

    document.getElementById(
        "leaderboardUsername"
    ).value = "";

    document.getElementById(
        "leaderboardPoints"
    ).value = "";

    loadLeaderboard();
}

async function loadLeaderboard() {

    const { data, error } =
    await supabaseClient
    .from("leaderboard")
    .select("*")
    .order("points", {
        ascending: false
    });

    if(error){
        console.log(error);
        return;
    }

    let container =
    document.getElementById(
        "adminLeaderboardList"
    );

    if(!container) return;

    container.innerHTML = "";

    data.forEach(player => {

        let card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML =
        player.username +
        " - " +
        player.points +
        " Points" +
        "<br><br>" +
        "<button onclick='deleteLeaderboard(" +
        player.id +
        ")'>Delete</button>";

        container.appendChild(card);

    });
}

async function deleteLeaderboard(id) {

    const confirmDelete =
    confirm("Delete player?");

    if(!confirmDelete) return;

    const { error } =
    await supabaseClient
    .from("leaderboard")
    .delete()
    .eq("id", id);

    if(error){
        console.log(error);
        return;
    }

    loadLeaderboard();
}
async function addHallOfFame() {

    let tournament =
    document.getElementById("hofTournament").value;

    let champion =
    document.getElementById("hofChampion").value;

    let year =
    document.getElementById("hofYear").value;

    const { error } =
    await supabaseClient
    .from("halloffame")
    .insert([
        {
            tournament: tournament,
            champion: champion,
            year: year
        }
    ]);

    if(error){
        alert("Failed to add champion");
        console.log(error);
        return;
    }

    loadHallOfFame();
}

async function loadHallOfFame() {

    const { data, error } =
    await supabaseClient
    .from("halloffame")
    .select("*")
    .order("year", {
        ascending: false
    });

    if(error){
        console.log(error);
        return;
    }

    let container =
    document.getElementById(
        "adminHallOfFameList"
    );

    if(!container) return;

    container.innerHTML = "";

    data.forEach(item => {

        let card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML =
        "🏆 " + item.tournament +
        " (" + item.year + ")" +
        "<br>" +
        "Champion: " + item.champion +
        "<br><br>" +
        "<button onclick='deleteHallOfFame(" +
        item.id +
        ")'>Delete</button>";

        container.appendChild(card);

    });
}

async function deleteHallOfFame(id) {

    const { error } =
    await supabaseClient
    .from("halloffame")
    .delete()
    .eq("id", id);

    if(error){
        console.log(error);
        return;
    }

    loadHallOfFame();
}
// LOGOUT
function logout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.href =
    "login.html";
}

// START
loadPlayers();
loadTournaments();
loadFixtures();
loadLeaderboard();
loadHallOfFame();