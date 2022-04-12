

window.addEventListener("load",() =>{
    
    let lieu = location.href
    if (lieu == "http://localhost/WebIII_magix/game.php"){
        setTimeout(gameState, 1000); // Appel initial (attendre 1 seconde)
    }
})

const applyStyles = iframe => {
    // Les valeurs sont celles données en exemple dans le document magic, il faudra les styliser
    let styles = {
        fontColor : "#333",
        backgroundColor : "rgba(87, 41, 5, 0.2)", 
        fontGoogleName : "Sofia", 
        fontSize : "20px", 
        hideIcons : true, //(or false),
        inputBackgroundColor : "red", 
        inputFontColor : "blue", 
        height : "700px", 
        memberListFontColor : "#ff00dd", 
        memberListBackgroundColor : "white"
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

const revenirLobby = () => {
    document.location.href="lobby.php";
}

const gameState = () =>{
    fetch("ajax.php", {
        method: "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(result => {
        
        if (typeof result !== "object"){
            document.querySelector(".texteBienvenu").innerHTML = result;
        }
        else {
            document.querySelector(".texteBienvenu").innerHTML = result.welcomeText;
            // information du méchant
            document.querySelector(".michantClassHero").innerHTML = "classe du michant : " + result.opponent.heroClass;
            document.querySelector(".michantNbCarte").innerHTML = "nb Carte du michant : " + result.opponent.handSize;
            document.querySelector(".michantHP").innerHTML = "HP du michant : " + result.opponent.hp;
            document.querySelector(".michantMP").innerHTML = "MP du michant : " + result.opponent.mp;
            document.querySelector(".michantLostCount").innerHTML = "Partie perdu du michant : " + result.opponent.lossCount;
            // Ses cartes en jeu
            document.querySelector(".michantBoard").innerHTML = "Jeu du michant : " + result.opponent.board;
    
             // information du joueur
             document.querySelector(".joueurClassHero").innerHTML = "classe du joueur : " + result.heroClass;
             document.querySelector(".joueurHP").innerHTML = "HP du joueur : " + result.hp;
             document.querySelector(".joueurMP").innerHTML = "MP du joueur : " + result.mp;
             // Ses cartes en jeu
             document.querySelector(".joueurBoard").innerHTML = "Jeu du joueur : " + result.board;
             // Ses cartes en main
             console.log(result.hand[0])
             let main = document.querySelector(".joueurCarte").append(new Carte(result.hand[0]).createCard()) //= "Carte du joueur : " + result.hand;
            //  for (card in result.hand) {
            //      let child = new Carte(card).createCard();
            //      main.append(child);
            //  }
    
             // info sur la partie
             document.querySelector(".remaingCardsCount").innerHTML = "Carte du joueur : " + result.remainingCardsCount;
             document.querySelector(".remaingTurnTime").innerHTML = "Temps du tour : " + result.remainingTurnTime;
             document.querySelector(".talent").innerHTML = "Talent : " + result.talent;
    
             // tour du joueur?
             document.querySelector(".tourJoueur").innerHTML = "Tour du joueur? : " + result.yourTurn;
        }     
        setTimeout(gameState, 1000); // en plaçant le setTimeout ici on évite de faire des appels en recevant le résultat
    })
}

class Carte{

    constructor(dict){
        this.id = dict.id;
        this.cost = dict.cost;
        this.hp = dict.hp;
        this.atk = dict.atk;
        this.mec = dict.mechanics;
        this.dedicated = dict.dedicated;
        this.uid = dict.uid;
    }

    createCard(){

        //fonctionne jusqu'ici! À la création du div
        let carte = document.createElement('div');
        let infoCarte = document.createElement('div');
        let mechanics = document.createElement('div');
        infoCarte.innerHTML = this.id + " " + this.cost + " " + this.hp + " " + this.atk + " " + this.dedicated + " " + this.uid
        mechanics.innerHTML = this.mec;
        carte.append(infoCarte);
        carte.append(mechanics);
    }
}