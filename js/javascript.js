let carteJAtk = 0;

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
            document.querySelector(".portraitMichant").onclick = () => {
                jouerCoup("ATTACK", carteJAtk, 0); // attaqué héros ennemi
            }
            document.querySelector(".michantNbCarte").innerHTML = "nb Carte du michant : " + result.opponent.handSize;
            document.querySelector(".michantHP").innerHTML = "HP du michant : " + result.opponent.hp;
            document.querySelector(".michantMP").innerHTML = "MP du michant : " + result.opponent.mp;
            document.querySelector(".michantLostCount").innerHTML = "Partie perdu du michant : " + result.opponent.lossCount;
           
            // Ses cartes en jeu
            // document.querySelector(".michantBoard").innerHTML = "Jeu du michant : " + result.opponent.board;
            // console.log(result.opponent.board)
            document.querySelector(".michantBoard").innerHTML="";
            for (const carte in result.opponent.board) {
                // frame de la carte             
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("michantCarte");

                carteStruct.onclick = () => {
                    console.log("ATTACK", carteJAtk, result.opponent.board[carte].uid);
                    jouerCoup("ATTACK", carteJAtk, result.opponent.board[carte].uid);
                };
                
                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStruct.append(carteVie);
                carteVie.innerHTML = " HP : " + result.opponent.board[carte].hp;

                // // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStruct.append(carteCout);
                carteCout.innerHTML = " Coût : "  + result.opponent.board[carte].cost;

                // // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteAtk.innerHTML = " ATK : " + result.opponent.board[carte].atk;
                carteStruct.append(carteAtk);

                // // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = " Description \n" + result.opponent.board[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".michantBoard").append(carteStruct);
            }
            // information du joueur
            document.querySelector(".joueurClassHero").innerHTML = "classe du joueur : " + result.heroClass;
            document.querySelector(".joueurHP").innerHTML = "HP du joueur : " + result.hp;
            document.querySelector(".joueurMP").innerHTML = "MP du joueur : " + result.mp;
            
            // Ses cartes en jeu
            document.querySelector(".joueurBoard").innerHTML = "";
            for (const carte in result.board) {
                // frame de la carte
                console.log(result.board[carte].uid)             
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("joueurCarte");

                carteStruct.onclick = () => {
                    carteStruct.style.borderColor = "red";
                    carteJAtk = result.board[carte].uid;
                    console.log(carteJAtk);
                };

                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStruct.append(carteVie);
                carteVie.innerHTML = " HP : " + result.board[carte].hp;

                // // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStruct.append(carteCout);
                carteCout.innerHTML = " Coût : "  + result.board[carte].cost;

                // // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteAtk.innerHTML = " ATK : " + result.board[carte].atk;
                carteStruct.append(carteAtk);

                // // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = " Description \n" + result.board[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".joueurBoard").append(carteStruct);
            }
            
             // Ses cartes en main
            document.querySelector(".carteEnMain").innerHTML = "";
            for (const carte in result.hand) {
              
                // frame de la carte             
                let carteStruct = document.createElement("div");
                carteStruct.classList.add("joueurCarte");

                carteStruct.onclick = () => {
                    carteStruct.remove();
                    console.log(result.hand[carte].uid)
                    jouerCoup("PLAY", result.hand[carte].uid);
                };
                
                // boite pour la vie
                let carteVie = document.createElement("div");
                carteVie.classList.add("carteInfoVie");
                carteStruct.append(carteVie);
                carteVie.innerHTML = " HP : " + result.hand[carte].hp;


                // // boite pour le coût
                carteCout = document.createElement("div");
                carteCout.classList.add("carteInfoCout");
                carteStruct.append(carteCout);
                carteCout.innerHTML = " Coût : "  + result.hand[carte].cost;

                // // boite pour l'attaque
                carteAtk = document.createElement("div");
                carteAtk.classList.add("carteInfoAtk");
                carteAtk.innerHTML = " ATK : " + result.hand[carte].atk;
                carteStruct.append(carteAtk);

                // // Description
                carteInfo = document.createElement("div");
                carteInfo.classList.add("carteInfoHab");
                carteInfo.innerHTML = " Description \n" + result.hand[carte].mechanics;
                carteStruct.append(carteInfo);

                document.querySelector(".carteEnMain").append(carteStruct);
            }
            
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