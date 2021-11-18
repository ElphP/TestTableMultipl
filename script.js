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

    // bouton valider et vidage du div "rules"
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
        divrules.innerHTML = "Temps écoulé: " + sec + " secondes";
        sec++;
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
    if (fautes == 0) {
        alert("Bravo, tu es un champion!!! 0 fautes!!! \n Tu as mis " + sec + " secondes");
    } else if (fautes != 0 && fautes <= 2) {
        alert(
            "Mouais... Aloys tu as fait \n" +
                fautes +
                " fautes en " +
                sec +
                " secondes, \ntu peux mieux faire...."
        );
    } else {
        alert(
            "Arghhh, Aloys tu as fais trop de fautes !\n (Tu as fait " +
                fautes +
                " fautes en " +
                sec +
                " secondes). \n Entraine-toi encore.... Courage!"
        );
    }

    // pénalités pour fautes
    sec = sec + fautes * 3;

    // entrée des scores si dans le top 3
    if (localStorage.tps3 == undefined || localStorage.tps3 == 'undefined' || sec <= localStorage.tps3) {
        // test place1
        if (localStorage.tps1 == 'undefined'|| localStorage.tps1 == undefined || sec <= localStorage.tps1 ) {
            localStorage.setItem("tps3", localStorage.tps2);
            localStorage.setItem("nom3", localStorage.nom2);
            localStorage.setItem("tps2", localStorage.tps1);
            localStorage.setItem("nom2", localStorage.nom1);
            localStorage.setItem(
                "nom1",
                prompt("Indique ton nom ou un pseudo: ")
            );
            localStorage.setItem("tps1", sec);
            
        }
        // test place2
        else if (localStorage.tps2 == undefined || localStorage.tps2 == 'undefined' || sec <= localStorage.tps2) {
            localStorage.setItem("tps3", localStorage.tps2);
            localStorage.setItem("nom3", localStorage.nom2);
            localStorage.setItem("tps2", sec);
            localStorage.setItem(
                "nom2",
                prompt("Indique ton nom ou un pseudo: ")
            );
        }
        // sinon place3
        else  {
            localStorage.setItem("tps3", sec);
            localStorage.setItem(
                "nom3",
                prompt("Indique ton nom ou un pseudo: ")
            );
        }
        
          
        
  }
    else alert("Dommage tu n'es pas arrivé sur le podium, retente ta chance!");
   
   
    var rejouer = confirm("Veux-tu rejouer?");
     if (rejouer) history.go(0); 
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
