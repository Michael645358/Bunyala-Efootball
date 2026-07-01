async function updateProfile() {

    let username =
    document.getElementById("username").value;

    const { error } =
    await supabaseClient
    .from("playerprofiles")
    .update({
        real_name:
        document.getElementById("realName").value,

        phone:
        document.getElementById("phone").value,

        favorite_club:
        document.getElementById("favoriteClub").value,

        rank:
        document.getElementById("rank").value,

        photo:
        document.getElementById("photo").value,

        bio:
        document.getElementById("bio").value
    })
    .eq("username", username);

    if(error){
        alert("Update failed");
        console.log(error);
        return;
    }

    alert("✅ Profile updated");
}