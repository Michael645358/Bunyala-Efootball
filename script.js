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
    alert(error.message);
    console.log(error);
    return;
}
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

    container.innerHTML = "";

    data.forEach(tournament => {

        container.innerHTML +=
        "<div class='card'>" +
        "<h3>" + tournament.title + "</h3>" +
        "<p>Entry Fee: KSh " +
        tournament.entry_fee +
        "</p>" +
        "<p>Prize Pool: KSh " +
        tournament.prize_pool +
        "</p>" +
        "</div>";

    });
}

async function loadHomeFixtures() {

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
    document.getElementById("homeFixturesList");

    if(!container) return;

    container.innerHTML = "";

    if(data.length === 0){
        container.innerHTML =
        "<div class='card'>No fixtures available</div>";
        return;
    }

    data.forEach(fixture => {

        container.innerHTML +=
        "<div class='card'>" +
        fixture.player1 +
        " 🆚 " +
        fixture.player2 +
        "</div>";

    });
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
    document.getElementById("leaderboardList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach((player, index) => {

        let medal = "";

        if(index === 0) medal = "🥇";
        else if(index === 1) medal = "🥈";
        else if(index === 2) medal = "🥉";

        container.innerHTML +=
        "<div class='card'>" +
        medal + " " +
        player.username +
        " - " +
        player.points +
        " Points" +
        "</div>";

    });
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
        "hallOfFameList"
    );

    if(!container) return;

    container.innerHTML = "";

    data.forEach(item => {

        container.innerHTML +=
        "<div class='card'>" +
        "🏆 " + item.tournament +
        " (" + item.year + ")" +
        "<br>" +
        "Champion: " + item.champion +
        "</div>";

    });
}
async function loadResults() {

    const { data, error } =
    await supabaseClient
    .from("results")
    .select("*")
    .order("id", { ascending: false });

    if(error){
        console.log(error);
        return;
    }

    let container =
    document.getElementById("homeResultsList");

    if(!container) return;

    container.innerHTML = "";

    if(data.length === 0){
        container.innerHTML =
        "<div class='card'>No results available</div>";
        return;
    }

    data.forEach(result => {

        container.innerHTML +=
        "<div class='card'>" +
        result.player1 + " " +
        result.score1 + " - " +
        result.score2 + " " +
        result.player2 +
        "<br>🏆 Winner: " +
        result.winner +
        "</div>";

    });
}
loadPlayers();
loadTournament();
loadHomeFixtures();
loadLeaderboard();
loadHallOfFame();
loadResults();