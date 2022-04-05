<?php
    require_once("partial/header.php");
    require_once("action/lobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>
<h1> Vous êtes connectés</h1>

<h6><a href="?logout=true">Déconnexion</a></h6>