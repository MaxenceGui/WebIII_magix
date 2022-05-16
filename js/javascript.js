let carteJAtk = 0;
let nomOpposant = "michant";
let nomJoueur = "moi";
let infoEntree = false;
let click = false;
let tableauClasse = ["Warrior", "Priest", "Hunter", "Warlock", "DemonHunter", "Rogue", "Paladin", "Shaman", "Druid", "Mage"];


window.addEventListener("load",() =>{

    let lieu = location.href
    if (lieu == "http://localhost/WebIII_magix/game.php"){
        setTimeout(gameState, 1000); // Appel initial (attendre 1 seconde)
        nomJoueur = localStorage.username;
    }

    if (lieu == "http://localhost/WebIII_magix/login.php"){
        document.querySelector("#username").value = localStorage.username;
        document.querySelector(".button_div").onclick = () =>{
            if (document.querySelector("#username").value != null){
                nomJoueur = document.querySelector("#username").value;
                localStorage.setItem("username", nomJoueur);
            }
        }
    }

    if(lieu == "http://localhost/WebIII_magix/historique.php"){
        pourcentageVictoire(localStorage.username);
    }
})

const applyStyles = iframe => {
    // Les valeurs sont celles données en exemple dans le document magic, il faudra les styliser
    let styles = {
        fontColor : "white",
        backgroundColor : "rgba(6, 68, 6, 0.8)", 
        fontGoogleName : "Press Start 2P", 
        fontSize : "10px", 
        hideIcons : true, //(or false),
        inputBackgroundColor : "rgba(240,240,240, 0.5)", 
        inputFontColor : "black", 
        height : "100vh", 
        memberListFontColor : "white", 
        memberListBackgroundColor : "green",
    }

    setTimeout(() => { 
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	    
        }, 100); 
}

const jouer = (type) => {

    formData = new FormData();
    formData.append("type", type); // type = PVP ou TRAINING

    fetch("ajax.php",{
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .then(result => {

        if (result == "JOINED_PVP" || result == "CREATED_PVP" || result == "JOINED_TRAINING"){
            document.location.href="game.php";
        }
        else{
            alert("connexion failed");
        }
    })
}

const jouerCoup = (type, uid=null, targetuid=null) =>{

    formData = new FormData();
    formData.append("type", type);
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .then(result => {
        document.querySelector(".texteBienvenu").innerHTML = result;
    })
}

const ecrireBD = (joueur, opposant, gagnant) =>{

    formData = new FormData();
    formData.append("joueur", joueur);
    formData.append("opposant", opposant);
    formData.append("gagnant", gagnant);

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .then(result =>{
        alert("information partie ajouté dans la bd");
    })
}

const pourcentageVictoire = (username) =>{
    formData = new FormData();
    formData.append("username", username);

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .then(result =>{
        document.querySelector(".caseVictoire").innerHTML = "Victoire : " + result[0][0];
    })
}

const supprimerBD = () =>{
    formData = new FormData();
    formData.append("vider", 1);

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(response => response.json())
    .then(result =>{
        alert("historique de partie supprimé");
    })
}

const revenirLobby = () => {
    document.location.href="lobby.php";
}

const allerHisto =() =>{
    document.location.href = "historique.php";
}

const gameState = () =>{
    fetch("ajax.php", {
        method: "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(result => {
        
        if (typeof result !== "object"){
            if (result == "LAST_GAME_LOST" && !infoEntree){
                document.querySelector(".texteBienvenu").innerHTML = "Défaite";
                ecrireBD(nomJoueur,nomOpposant, nomOpposant);
                infoEntree = true;
            }
            else if (result == "LAST_GAME_WON" && !infoEntree){
                document.querySelector(".texteBienvenu").innerHTML = "Victoire";
                ecrireBD(nomJoueur,nomOpposant, nomJoueur);
                infoEntree = true;
            }

            else if (result == "WAITING" && !infoEntree){
                document.querySelector(".texteBienvenu").innerHTML = "En attente";
            }
        }
        else {

            if (result.mp >= 2 && !result.heroPowerAlreadyUsed){
                document.querySelector(".btnPower").style.borderColor ="yellow";
            }
            else{
                document.querySelector(".btnPower").style.borderColor ="white";
            }

            infoEntree = false;
            nomOpposant = result.opponent.username;
            document.querySelector(".texteBienvenu").innerHTML = result.welcomeText;
            
            // information du méchant
            document.querySelector(".michantClassHero").innerHTML = result.opponent.heroClass;
            document.querySelector("#portraitMichant").onclick = () => {
                jouerCoup("ATTACK", carteJAtk, 0); // attaqué héros ennemi
            }
            let classe = associerAvatar(result.opponent.heroClass);
            document.querySelector("#portraitMichant").classList.add(classe)

            document.querySelector(".boiteCarteMichant").innerHTML="";
            for (let index = 0; index < result.opponent.handSize; index++) {
                let carte = document.createElement("div");
                carte.classList.add("michantNbCarte");
                document.querySelector(".boiteCarteMichant").append(carte);
            }

            document.querySelector(".nomMichant").innerHTML = result.opponent.username;
            document.querySelector(".michantHP").innerHTML = result.opponent.hp;
            document.querySelector(".michantMP").innerHTML = result.opponent.mp;
            document.querySelector(".michantLostCount").innerHTML = "Défait : " + result.opponent.lossCount;
           
            // Ses cartes en jeu
            document.querySelector(".michantBoard").innerHTML="";
            for (const carte in result.opponent.board) {
                // frame de la carte             
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("carteFrame");

                carteStruct.onclick = () => {
                    jouerCoup("ATTACK", carteJAtk, result.opponent.board[carte].uid);
                };

                // boite contenant les infos de la carte
                let carteStats = document.createElement("div");
                carteStats.classList.add("carteInfo");
                if(result.opponent.board[carte].mechanics[0] == "Taunt"){
                    carteStats.style.backgroundColor = "grey";
                }
                else if (result.opponent.board[carte].mechanics[0] == "Stealth"){
                    carteStats.style.backgroundColor = "black";
                }
                carteStruct.append(carteStats);
                
                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStats.append(carteVie);
                carteVie.innerHTML = result.opponent.board[carte].hp;

                // // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStats.append(carteCout);
                carteCout.innerHTML = result.opponent.board[carte].cost;

                // // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteAtk.innerHTML = result.opponent.board[carte].atk;
                carteStats.append(carteAtk);

                // boite pour l'image
                carteImg = document.createElement("div");
                let classe = assignerCarte(result.opponent.board[carte]);
                carteImg.classList.add(classe);
                carteStruct.append(carteImg);

                // // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = result.opponent.board[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".michantBoard").append(carteStruct);
            }
            // information du joueur
            document.querySelector(".joueurClassHero").innerHTML = result.heroClass;
            document.querySelector(".joueurHP").innerHTML = result.hp;
            document.querySelector(".joueurMP").innerHTML = result.mp;
            
            // Ses cartes en jeu
            document.querySelector(".joueurBoard").innerHTML = "";
            for (const carte in result.board) {
                // frame de la carte            
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("carteFrame");

                carteStruct.onclick = () => {
                    carteStruct.style.borderColor = "red";
                    carteJAtk = result.board[carte].uid;
                };

                // boite contenant les infos de la carte
                let carteStats = document.createElement("div");
                carteStats.classList.add("carteInfo");
                if(result.board[carte].mechanics[0] == "Taunt"){
                    carteStats.style.backgroundColor = "grey";
                }
                else if (result.board[carte].mechanics[0] == "Stealth"){
                    carteStats.style.backgroundColor = "black";
                }
                carteStruct.append(carteStats);

                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStats.append(carteVie);
                carteVie.innerHTML = result.board[carte].hp;

                // // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStats.append(carteCout);
                carteCout.innerHTML = result.board[carte].cost;

                // // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteAtk.innerHTML = result.board[carte].atk;
                carteStats.append(carteAtk);

                // boite pour l'image
                carteImg = document.createElement("div");
                let classe = assignerCarte(result.board[carte]);
                carteImg.classList.add(classe);
                carteStruct.append(carteImg);

                // // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = result.board[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".joueurBoard").append(carteStruct);
            }
            
             // Ses cartes en main
            document.querySelector(".carteEnMain").innerHTML = "";
            for (const carte in result.hand) {
              
                // frame de la carte             
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("carteFrame");

                if (result.hand[carte].cost <= result.mp){
                    carteStruct.style.borderWidth = "2px";
                    carteStruct.style.borderColor = "yellow";
                    carteStruct.style.transform = "scale(1.1)";
                }

                carteStruct.onclick = () => {
                    carteStruct.remove();
                    jouerCoup("PLAY", result.hand[carte].uid);
                };

                // boite contenant les infos de la carte
                let carteStats = document.createElement("div");
                carteStats.classList.add("carteInfo");
                if(result.hand[carte].mechanics[0] == "Taunt"){
                    carteStats.style.backgroundColor = "grey";
                }
                else if (result.hand[carte].mechanics[0] == "Stealth"){
                    carteStats.style.backgroundColor = "black";
                }
                carteStruct.append(carteStats);
                
                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStats.append(carteVie);
                carteVie.innerHTML = result.hand[carte].hp;


                // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStats.append(carteCout);
                carteCout.innerHTML = result.hand[carte].cost;

                // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteStats.append(carteAtk);
                carteAtk.innerHTML = result.hand[carte].atk;

                // boite pour l'image
                carteImg = document.createElement("div");
                let classe = assignerCarte(result.hand[carte]);
                carteImg.classList.add(classe);
                carteStruct.append(carteImg);

                // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = result.hand[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".carteEnMain").append(carteStruct);
            }
            
            // info sur la partie
            document.querySelector(".remaingCardsCount").innerHTML = result.remainingCardsCount;
            document.querySelector(".remaingTurnTime").innerHTML = result.remainingTurnTime;
            document.querySelector(".talent").innerHTML = result.talent;
            classe = associerAvatar(result.heroClass);
            document.querySelector("#portraitJoueur").classList.add(classe)
    
            // tour du joueur?
            if( result.yourTurn){
                document.querySelector("#portraitJoueur").style.backgroundColor = "rgba(255, 87, 51, 0.8)";
                document.querySelector("#portraitMichant").style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            }
            else{
                document.querySelector("#portraitMichant").style.backgroundColor = "rgba(255, 87, 51, 0.8)";
                document.querySelector("#portraitJoueur").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            }
            
        }     
        setTimeout(gameState, 1000); // en plaçant le setTimeout ici on évite de faire des appels en recevant le résultat
    })
}

const assignerCarte = (carte) =>{

    // carte de niveau 1
    if (carte.id == 2 || carte.id == 3){
        return "carteImg-0";
    }

    else if (carte.id == 71 || carte.id == 75 || carte.id ==77){
        return "carteImg-1";
    }

    else if (carte.id == 79 || carte.id == 85 || carte.id ==4){
        return "carteImg-2";
    }

    // carte de niveau 2
    else if (carte.id == 5 || carte.id == 6){
        return "carteImg-3";
    }

    else if (carte.id == 8 || carte.id == 9 || carte.id == 44){
        return "carteImg-4";
    }

    else if (carte.id == 50 || carte.id == 52 || carte.id ==59){
        return "carteImg-5";
    }

    else if (carte.id == 63 || carte.id == 88 || carte.id ==7){
        return "carteImg-6";
    }

    // carte de niveau 3
    else if (carte.id == 10 || carte.id == 11 || carte.id == 12){
        return "carteImg-7";
    }

    else if (carte.id == 13 || carte.id == 14 || carte.id == 15){
        return "carteImg-8";
    }

    else if (carte.id == 36 || carte.id == 37 || carte.id == 51){
        return "carteImg-9";
    }

    else if (carte.id == 55 || carte.id == 60 || carte.id == 61 || carte.id == 95){
        return "carteImg-10";
    }

    else if (carte.id == 66 || carte.id == 67 || carte.id == 73){
        return "carteImg-11";
    }

    else if (carte.id == 80 || carte.id == 81 || carte.id == 82){
        return "carteImg-12";
    }

    else if (carte.id == 83 || carte.id == 84 || carte.id == 90){
        return "carteImg-13";
    }

    // carte de niveau 4
    else if (carte.id == 16 || carte.id == 18 || carte.id == 19){
        return "carteImg-14";
    }

    else if (carte.id == 20 || carte.id == 34 || carte.id == 40){
        return "carteImg-15";
    }

    else if (carte.id == 48 || carte.id == 56 || carte.id == 74 || carte.id == 78){
        return "carteImg-16";
    }

    else if (carte.id == 87 || carte.id == 91 || carte.id == 96){
        return "carteImg-17";
    }

    // carte de niveau 5
    else if (carte.id == 17 || carte.id == 21 || carte.id == 22){
        return "carteImg-18";
    }

    else if (carte.id == 23 || carte.id == 38 || carte.id == 41){
        return "carteImg-19";
    }

    else if (carte.id == 45 || carte.id == 46 || carte.id == 49){
        return "carteImg-20";
    }

    else if (carte.id == 65 || carte.id == 76 || carte.id == 89){
        return "carteImg-21";
    }

     // carte de niveau 6
    else if (carte.id == 24 || carte.id == 25){
        return "carteImg-22";
    }

    else if (carte.id == 26 || carte.id == 39 || carte.id == 42){
        return "carteImg-23";
    }

    else if (carte.id == 58 || carte.id == 68 || carte.id == 69){
        return "carteImg-24";
    }

    else if (carte.id == 70 || carte.id == 72 || carte.id == 94){
        return "carteImg-25";
    }

     // carte de niveau 7

    else if (carte.id == 27 || carte.id == 28 || carte.id == 35){
        return "carteImg-26";
    }

    else if (carte.id == 43 || carte.id == 53 || carte.id == 57){
        return "carteImg-27";
    }

    else if (carte.id == 62 || carte.id == 86 || carte.id == 93){
        return "carteImg-28";
    }

     // carte de niveau 8
     else if (carte.id == 29 || carte.id == 47){
        return "carteImg-29";
    }

    else if (carte.id == 54 || carte.id == 92){
        return "carteImg-30";
    }

    // carte de niveau 9

    else if (carte.id == 30 || carte.id == 31){
        return "carteImg-31";
    }

    // carte de niveau 10

    else{
        return "carteImg-32";
    }
}

const associerAvatar = (classe) =>{

    for (const i in tableauClasse) {
        if (classe == tableauClasse[i]) {
            return "portrait" + classe;
        }
    }
}

const afficherDeck = (key) =>{
    if (click == false){  
        deck = document.createElement("iframe");
        deck.src = "https://magix.apps-de-cours.com/server/#/deck/" + key;
        deck.id ="deck"
        deck.style.height = "40%";
        document.querySelector("#lobby").append(deck)

        click = true;
    }
    else{
        document.querySelector("#deck").remove();
        click = false;
    }
}

const afficherChat = () =>{
    if (click == false){
        document.querySelector(".chat").style.width = "0%";
        document.querySelector(".contenantBoard").style.width = "100%";
        click = true;
    }
    else{
        document.querySelector(".chat").style.width = "20%";
        document.querySelector(".contenantBoard").style.width = "80%";
        click = false;
    }

}