<?php
    require_once("partial/header.php");
    require_once("action/lobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>

<div id="lobby">
    <div class="lobbyBouton">
        <button onClick='jouer("TRAINING")'>Pratique</button>
        <button onClick='jouer("PVP")'>Jouez (PVP)</button>
        <button onClick='allerHisto()'>historique</button>
        <button>Regarder une partie</button>
        <button>Deck</button>
        <button>Quitter</button>
        <h6><a href="?logout=true">Déconnexion</a></h6>
    </div>
    <div class ="chatBox">
        <h1> Vous êtes connectés</h1>
        <iframe class="chatbox" style="width:700px;height:240px;" onload="applyStyles(this)"

            src=<?= $data["chat"] ?>> 

        </iframe>
    </div>
</div>


 


