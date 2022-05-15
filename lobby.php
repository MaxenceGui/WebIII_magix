<?php
    require_once("partial/header.php");
    require_once("action/lobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>

<div id="lobby">
    <div class="renard-1"></div>
    <div class="renard-2"></div>
    <div class="renard-3"></div>
    <div class="textBienvenue">
        <h1 class="lobbyTitre"> Bienvenue challenger!</h1>
    </div>
    
    <iframe class="chatBox" onload="applyStyles(this)"

        src=<?= $data["chat"][0] ?>> 

    </iframe>
    
    <div class="lobbyBouton">
        <button onClick='jouer("TRAINING")'>Pratique</button>
        <button onClick='jouer("PVP")'>Jouez (PVP)</button>
        <button onClick='allerHisto()'>historique</button>
        <button>Regarder une partie</button>
        <button onClick="afficherDeck('<?= $data["chat"][1]?>')">Deck</button>
        <button><a href="?logout=true">Quitter</a></button>
    </div>
</div>


 


