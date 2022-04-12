<?php
    require_once("partial/header.php");
    require_once("action/lobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>
<h1> Vous êtes connectés</h1>

<iframe class="chatbox" style="width:700px;height:240px;" onload="applyStyles(this)"

        src=<?= $data["chat"] ?>> 

</iframe> 

<div>
    <button onClick='jouer("TRAINING")'>Pratique</button>
    <button onClick='jouer("PVP")'>Jouez (PVP) NE PAS CLIQUER POUR L'INSTANT</button>
    <button>Quitter</button>
    <button>Regarder une partie</button>
    <button>Deck</button>
</div>


<h6><a href="?logout=true">Déconnexion</a></h6>