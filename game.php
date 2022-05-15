<?php
    require_once("action/gameAction.php");
    $action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div id="zoneJeu">
    <div id="zoneTop">
        <div class="partieDiv">
            <div class="infoPartie">
                <button onClick='jouerCoup("SURRENDER")'>Abandonner</button>
                <button onClick='revenirLobby()'>lobby</button>
            </div>
        </div>
    
        <div class="michantDiv">
            <h1 class="texteBienvenu">Game On</h1>
            <div class="michantClassHero"></div>
            <div class="portraitMichant"></div>
            <div class="infoMichant">
                <div class="michantNbCarte"></div>
                <div class="michantHP"></div>
                <div class="michantMP"></div>
                <div class="michantLostCount"></div>
            </div>
        </div>

        <div class="partieDiv">
            <div class="infoPartie">
                <button onClick='jouerCoup("END_TURN")'>Fin du tour</button>
                <div class="remaingTurnTime"></div>
            </div>
        </div>
    </div>

    <div class="michantBoard"></div>


    <div class="joueurBoard"></div>

    <div id="zoneJoueur">
        <div class="joueurDiv">
            <div class="infoJoueur">
                <div class="joueurClassHero"></div>
                <div class="joueurHP"></div>
                <div class="joueurMP"></div>
                <div class="tourJoueur"></div>
            </div>
        </div>

        <div class="carteEnMain"></div>

        <div class="joueurDiv">
            <div class="remaingCardsCount"></div>
            <div class="talent"></div>
            <button onClick='jouerCoup("HERO_POWER")'>Pouvoir</button>
        </div>
    </div>
</div>
