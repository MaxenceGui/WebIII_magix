<?php
    require_once("partial/header.php");
    require_once("action/gameAction.php");

    $action = new GameAction();
    $data = $action->execute();
?>
<h1>Game On</h1>

<h6><a href="?logout=true">Déconnexion</a></h6>