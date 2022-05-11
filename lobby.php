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
        <button><a href="?logout=true">Quitter</a></button>
    </div>
    <div class ="chatBox">
        <h1> Vous êtes connectés</h1>
        <iframe class="chatbox" style="width:700px;height:240px;" onload="applyStyles(this)"

            src=<?= $data["chat"] ?>> 

        </iframe>
    </div>
</div>


 


