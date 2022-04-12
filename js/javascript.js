window.addEventListener("load",() =>{
    
    const exemple = () =>{
        fetch("ajax.php", {})
        .then(response => response.json())
        .then(result => {
            result.forEach(element => {
                console.log(element);
                if (element.status == 1){
                    document.querySelector("#"+element.name).src = "img/light-on.png"
                    // document.querySelector("#light" + light.id).src = "img/light-" + (light.status == "1" ? "on" : "off") + ".png";
                    // Cette façon de faire permet de sauver une ligne de code en concatenant le if else (? et :)
                }
                else{
                    document.querySelector("#"+element.name).src = "img/light-off.png"
                }
            });
            setTimeout(updateLights, 5000); // en plaçant le setTimeout ici on évite de faire des appels en recevant le résultat
        })
    }

    //exemple();
  
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
            document.location.href="game.php"
        }
        else{
            alert("connexion failed")
        }
    })
}