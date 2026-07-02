const SUPABASE_URL = "https://gwncuzcafdcorfenrqyr.supabase.co";
const SUPABASE_KEY = "sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveProfile() {

    let username =
    document.getElementById("username").value;

    let fullname =
    document.getElementById("fullname").value;

    let club =
    document.getElementById("club").value;

    let country =
    document.getElementById("country").value;

    let rating =
    document.getElementById("rating").value;

    let photo =
    document.getElementById("photo").value;

    let bio =
    document.getElementById("bio").value;

    let error;

    if(window.editingId){

        ({ error } = await supabaseClient
        .from("player_profiles")
        .update({
            username,
            fullname,
            club,
            country,
            rating,
            photo,
            bio
        })
        .eq("id", window.editingId));

        window.editingId = null;

    } else {

        ({ error } = await supabaseClient
        .from("player_profiles")
        .insert([{
            username,
            fullname,
            club,
            country,
            rating,
            photo,
            bio
        }]));
    }

    if(error){
        alert("Failed to save profile");
        console.log(error);
        return;
    }

    alert("✅ Profile saved");

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

            "<button onclick='editProfile(" +
            profile.id +
            ")'>Edit</button> " +

            "<button onclick='deleteProfile(" +
            profile.id +
            ")'>Delete</button>";

        container.appendChild(card);

    });
}

async function editProfile(id) {

    const { data, error } =
    await supabaseClient
    .from("player_profiles")
    .select("*")
    .eq("id", id)
    .single();

    if(error){
        console.log(error);
        return;
    }

    document.getElementById("username").value = data.username;
    document.getElementById("fullname").value = data.fullname;
    document.getElementById("club").value = data.club;
    document.getElementById("country").value = data.country;
    document.getElementById("rating").value = data.rating;
    document.getElementById("photo").value = data.photo;
    document.getElementById("bio").value = data.bio;

    window.editingId = id;
}

async function deleteProfile(id) {

    const confirmDelete =
    confirm("Delete this profile?");

    if(!confirmDelete) return;

    const { error } =
    await supabaseClient
    .from("player_profiles")
    .delete()
    .eq("id", id);

    if(error){
        console.log(error);
        return;
    }

    loadProfiles();
}

loadProfiles();