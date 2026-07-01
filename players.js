const SUPABASE_URL = "https://gwncuzcafdcorfenrqyr.supabase.co";
const SUPABASE_KEY = "sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveProfile() {

    let username = document.getElementById("username").value;
    let fullname = document.getElementById("fullname").value;
    let club = document.getElementById("club").value;
    let country = document.getElementById("country").value;
    let rating = document.getElementById("rating").value;
    let photo = document.getElementById("photo").value;
    let bio = document.getElementById("bio").value;

    const { error } = await supabaseClient
        .from("player_profiles")
        .insert([{
            username,
            fullname,
            club,
            country,
            rating,
            photo,
            bio
        }]);

    if(error){
        alert("Failed to save profile");
        console.log(error);
        return;
    }

    alert("Profile saved successfully");
    loadProfiles();
}

async function loadProfiles() {

    const { data, error } = await supabaseClient
        .from("player_profiles")
        .select("*")
        .order("id");

    if(error){
        console.log(error);
        return;
    }

    let container = document.getElementById("profilesList");

    if(!container) return;

    container.innerHTML = "";

    data.forEach(profile => {

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML =
            "<img src='" + profile.photo + "' width='100'>" +
            "<h3>" + profile.username + "</h3>" +
            "<p><b>Name:</b> " + profile.fullname + "</p>" +
            "<p><b>Club:</b> " + profile.club + "</p>" +
            "<p><b>Country:</b> " + profile.country + "</p>" +
            "<p><b>Rating:</b> " + profile.rating + "</p>" +
            "<p>" + profile.bio + "</p>";

        container.appendChild(card);
    });
}

loadProfiles();