<?php
    require_once("action/gameAction.php");
    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<h1 class="texteBienvenu">Game On</h1>

<div class="michantDiv">
    <div class="infoMichant">
        <div class="michantClassHero"></div>
        <div class="michantNbCarte"></div>
        <div class="michantHP"></div>
        <div class="michantMP"></div>
        <div class="michantLostCount"></div>
    </div>
    <div class="michantBoard"></div>
</div>

<div class="joueurDiv">
    <div class="infoJoueur">
        <div class="joueurClassHero"></div>
        <div class="joueurHP"></div>
        <div class="joueurMP"></div>
    </div>
    <div class="joueurBoard"></div>
    <div class="joueurCarte"></div>
</div>

<div class="partieDiv">
    <div class="infoPartie">
        <div class="remaingCardsCount"></div>
        <div class="remaingTurnTime"></div>
        <div class="talent"></div>
    </div>
</div>

<div class="tourJoueur"></div>

<button onClick='jouerCoup("SURRENDER")'>Abandonner</button>
<button onClick='jouerCoup("HERO_POWER")'>Pouvoir</button>
<button onClick='jouerCoup("END_TURN")'>Fin du tour</button>
<button onClick='revenirLobby()'>lobby</button>