function openCloseMenu() {
    let x = document.getElementById("buttons-container");
    if (x.className === "buttons-container-active") {
        x.className = "buttons-container";
    } else {
        x.className = "buttons-container-active";
    }
}