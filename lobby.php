<?php
    require_once("partial/header.php");
    require_once("action/lobbyAction.php");

    $action = new LobbyAction();
    $data = $action->execute();
?>
<h1> Vous êtes connectés</h1>

<button>Pratique</button>
<button>Jouez</button>
<button>Quitter</button>
<button>Regarder une partie</button>
<button>Deck</button>

<h6><a href="?logout=true">Déconnexion</a></h6>