const SUPABASE_URL =
"https://gwncuzcafdcorfenrqyr.supabase.co";

const SUPABASE_KEY =
"sb_publishable_EnMAhkA4dWpUuJYYdpizhg_VQ6CDG4z";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function initiatePayment() {

    let name =
    document.getElementById("mpesaName").value;

    let phone =
    document.getElementById("mpesaPhone").value;

    let amount =
    document.getElementById("mpesaAmount").value;

    if(name === "" || phone === ""){
        alert("Fill all fields");
        return;
    }

    const { data, error } =
    await supabaseClient
    .from("payments")
    .insert([
        {
            name: name,
            phone: phone,
            amount: Number(amount),
            status: "Pending"
        }
    ])
    .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if(error){
        alert("Error: " + error.message);
        return;
    }

    document.getElementById("paymentMessage").innerHTML =
    "✅ Payment request submitted successfully";

    setTimeout(() => {
        document.getElementById("paymentMessage").innerHTML = "";
    }, 3000);
}