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
    .from("playerprofiles")
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

        container.innerHTML +=
        "<div class='card'>" +
        "<h3>" + player.username + "</h3>" +
        "<button onclick='deletePlayer(" +
        player.id +
        ")'>Remove</button>" +
        "</div>";

    });
}

// DELETE PLAYER
async function deletePlayer(id) {

    await supabaseClient
    .from("playerprofiles")
    .delete()
    .eq("id", id);

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

    if(error){
        alert("Failed to create tournament");
        console.log(error);
        return;
    }

    alert("Tournament created");

    loadTournaments();
}

// LOAD TOURNAMENTS
async function loadTournaments() {

    const { data } =
    await supabaseClient
    .from("tournaments")
    .select("*")
    .order("id");

    let container =
    document.getElementById("tournamentsList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(tournament => {

        container.innerHTML +=
"<div class='card'>" +
tournament.title +
"<br>Fee: " +
tournament.entry_fee +
"<br>Prize: " +
tournament.prize_pool +
"<br><br>" +
"<button onclick='deleteTournament(" +
tournament.id +
")'>Delete</button>" +
"</div>";

    });
}
async function deleteTournament(id) {

    await supabaseClient
    .from("tournaments")
    .delete()
    .eq("id", id);

    loadTournaments();
}
// CREATE FIXTURE
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

    loadFixtures();
}

// LOAD FIXTURES
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

        container.innerHTML +=
"<div class='card'>" +
fixture.player1 +
" 🆚 " +
fixture.player2 +
"<br><br>" +
"<button onclick='deleteFixture(" +
fixture.id +
")'>Delete</button>" +
"</div>";

    });
}
async function deleteFixture(id) {

    await supabaseClient
    .from("fixtures")
    .delete()
    .eq("id", id);

    loadFixtures();
}
// LOGOUT
function logout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.href =
    "login.html";
}
// ADD LEADERBOARD PLAYER
async function addLeaderboard() {

    let username =
    document.getElementById("leaderboardUsername").value;

    let points =
    document.getElementById("leaderboardPoints").value;

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

    loadLeaderboard();
}

// LOAD LEADERBOARD
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
    document.getElementById("adminLeaderboardList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(player => {

        container.innerHTML +=
"<div class='card'>" +
player.username +
" - " +
player.points +
" Points" +
"<br><br>" +
"<button onclick='deleteLeaderboard(" +
player.id +
")'>Delete</button>" +
"</div>";

    });
}
async function deleteLeaderboard(id) {

    await supabaseClient
    .from("leaderboard")
    .delete()
    .eq("id", id);

    loadLeaderboard();
}
// ADD HALL OF FAME
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

// LOAD HALL OF FAME
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
    document.getElementById("adminHallOfFameList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(item => {

       container.innerHTML +=
"<div class='card'>" +
"🏆 " + item.tournament +
" (" + item.year + ")" +
"<br>Champion: " +
item.champion +
"<br><br>" +
"<button onclick='deleteHallOfFame(" +
item.id +
")'>Delete</button>" +
"</div>"; 

    });
}
async function deleteHallOfFame(id) {

    await supabaseClient
    .from("halloffame")
    .delete()
    .eq("id", id);

    loadHallOfFame();
}
// ADD RESULT
async function addResult() {
    const { error } =
    await supabaseClient
    .from("results")
    .insert([
        {
            player1: document.getElementById("resultPlayer1").value,
            player2: document.getElementById("resultPlayer2").value,
            score1: document.getElementById("score1").value,
            score2: document.getElementById("score2").value,
            winner: document.getElementById("winner").value
        }
    ]);

    if(error){
        alert("Failed to save result");
        console.log(error);
        return;
    }

    alert("✅ Result saved");

    loadResults();
}

// LOAD RESULTS
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
    document.getElementById("resultsAdminList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(result => {

        container.innerHTML +=
"<div class='card'>" +
result.player1 + " " +
result.score1 + " - " +
result.score2 + " " +
result.player2 +
"<br>🏆 Winner: " +
result.winner +
"<br><br>" +
"<button onclick='deleteResult(" +
result.id +
")'>Delete</button>" +
"</div>";

    });
}
async function deleteResult(id) {

    await supabaseClient
    .from("results")
    .delete()
    .eq("id", id);

    loadResults();
}
// LOAD PAYMENTS
async function loadPayments() {

    const { data, error } =
    await supabaseClient
    .from("payments")
    .select("*")
    .order("id", { ascending: false });

    if(error){
        console.log(error);
        return;
    }

    let container =
    document.getElementById("paymentsList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(payment => {

        container.innerHTML +=
        "<div class='card'>" +
        "<b>" + payment.name + "</b>" +
        "<br>Phone: " + payment.phone +
        "<br>Amount: KSh " + payment.amount +
        "<br>Status: " + payment.status +
        "<br><br>" +
        "<button onclick='approvePayment(" +
payment.id +
")'>Approve</button> " +
"<button onclick='deletePayment(" +
payment.id +
")'>Delete</button>"
        "</div>";

    });
}

// APPROVE PAYMENT
async function approvePayment(id) {

    const { error } =
    await supabaseClient
    .from("payments")
    .update({
        status: "Paid"
    })
    .eq("id", id);

    if(error){
        console.log(error);
        return;
    }

    alert("✅ Payment approved");

    loadPayments();
}
async function deletePayment(id) {

    await supabaseClient
    .from("payments")
    .delete()
    .eq("id", id);

    loadPayments();
}
// START
loadPlayers();
loadTournaments();
loadFixtures();
loadLeaderboard();
loadHallOfFame();
loadResults();
loadPayments();