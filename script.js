document.getElementById("first").innerHTML =
    localStorage.nom1 + " - " + localStorage.tps1 + " secondes";
document.getElementById("second").innerHTML =
    localStorage.nom2 + " - " + localStorage.tps2 + " secondes";
document.getElementById("third").innerHTML =
    localStorage.nom3 + " - " + localStorage.tps3 + " secondes";

var tabresult = [];
var sec = 0;

function affichage() {
    //  création des tables
    for (i = 0; i < 10; i++) {
        var a = Math.floor(Math.random() * 12);
        var b = Math.floor(Math.random() * 12);
        tabresult[i] = a * b;

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDivstyle");
        var text1 = document.createElement("span");
        text1.innerText = a + " x " + b;
        var formul = document.createElement("span");
        formul.innerHTML = `<input type=text id=ind${i} placeHolder=résultat>`;

        document.body.appendChild(newDiv);
        newDiv.appendChild(text1);
        newDiv.appendChild(formul);
    }

    // bouton valider  et vidage du div "rules"
    var btn1 = document.createElement("button");
    btn1.onclick = valid;
    var text2 = document.createElement("span");
    text2.innerHTML = "Valider";
    document.body.appendChild(btn1);
    btn1.appendChild(text2);

    var divrules = document.getElementById("rules");
    while (divrules.firstChild) {
        divrules.removeChild(divrules.firstChild);
    }

    // lancement du chronomètre
    time = setInterval(chrono, 1000);

    function chrono() {
        sec++;
        divrules.innerHTML = "Temps écoulé: " + sec + " secondes";
    }
}

function valid() {
    clearInterval(time);
    var mesresult = [];
    var fautes = 0;
    var div = document.querySelectorAll("#newDivstyle");
    for (j = 0; j < 10; j++) {
        mesresult[j] = document.getElementById("ind" + j).value;
        if (mesresult[j] != tabresult[j] || mesresult[j] == "") {
            div[j].style.backgroundColor = "red";
            fautes++;
        } else div[j].style.backgroundColor = "lightgreen";
    }

    var textresult2 = "";
    
    // pénalités pour fautes
    secpenalite = sec + fautes * 3;

    // entrée des scores si dans le top 3
    if (
        localStorage.tps3 == undefined ||
        localStorage.tps3 == "undefined" ||
        secpenalite <= localStorage.tps3
    ) {
        // test place1
        if (
            localStorage.tps1 == "undefined" ||
            localStorage.tps1 == undefined ||
            secpenalite <= localStorage.tps1
        ) {
            localStorage.setItem("tps3", localStorage.tps2);
            localStorage.setItem("nom3", localStorage.nom2);
            localStorage.setItem("tps2", localStorage.tps1);
            localStorage.setItem("nom2", localStorage.nom1);
            localStorage.setItem(
                "nom1",
                prompt("Indique ton nom ou un pseudo: ")
            );
            localStorage.setItem("tps1", secpenalite);
        }
        // test place2
        else if (
            localStorage.tps2 == undefined ||
            localStorage.tps2 == "undefined" ||
            secpenalite <= localStorage.tps2
        ) {
            localStorage.setItem("tps3", localStorage.tps2);
            localStorage.setItem("nom3", localStorage.nom2);
            localStorage.setItem("tps2", secpenalite);
            localStorage.setItem(
                "nom2",
                prompt("Indique ton nom ou un pseudo: ")
            );
        }
        // sinon place3
        else {
            localStorage.setItem("tps3", secpenalite);
            localStorage.setItem(
                "nom3",
                prompt("Indique ton nom ou un pseudo: ")
            );
        }
    } else
        var textresult2 =
            "Dommage tu n'as pas réussi à monter sur le podium, entraîne-toi encore pour aller plus vite! ";

    var textresult = "";
    if (fautes == 0) {
        textresult =
            "Tu es un champion!!! 0 fautes!!!  Tu as mis " + sec + " secondes.";
    } else if (fautes != 0 && fautes <= 2) {
        textresult =
            "Tu as fait " +
            fautes +
            " faute(s) en " +
            sec +
            " secondes, tu peux mieux faire....";
    } else {
        textresult =
            "Tu as fais trop de fautes ! (Tu as fait " +
            fautes +
            " fautes en " +
            sec +
            " secondes).  Entraine-toi encore.... Courage!";
    }

    if (textresult2 == "") {
        textresult2 += "Bravo tu viens d'inscrire ton nom sur le podium!!!";
    }

    var divrules = document.querySelector("#rules");
    divrules.style.backgroundColor = "#0000A3";
    divrules.style.color = "lightgreen";
    var text4 = document.createElement("span");
    text4.innerHTML = textresult + "<br />" + "<br />";
    var text5 = document.createElement("span");
    text5.innerHTML = textresult2 + "<br />";
    divrules.appendChild(text4);
    divrules.appendChild(text5);

    //désactivation du btn valider
    this.disabled = true;

    //création du bouton nouvelle partie
    var btn2 = document.createElement("button");
    var text3 = document.createElement("span");
    text3.innerHTML = "Nouvelle partie";

    divrules.removeChild(divrules.firstChild);
    divrules.appendChild(btn2);
    btn2.appendChild(text3);

    btn2.addEventListener("click", () => {
        history.go(0);
    });
}

function erase() {
    localStorage.removeItem("tps1");
    localStorage.removeItem("tps2");
    localStorage.removeItem("tps3");
    localStorage.removeItem("nom1");
    localStorage.removeItem("nom2");
    localStorage.removeItem("nom3");
    history.go(0);
}
