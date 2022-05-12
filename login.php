<?php
    require_once("action/loginAction.php");
    require_once("partial/header.php");

    $action = new LoginAction();
    $data = $action->execute();
?>

<div id="zoneAccueil">
    <div class="chat"></div>
    <div class="character"></div>
    <div id="accueil">
        <h1> Connexion </h1>
        <form class="formulaire" action="login.php" method="post">
            <div class="usager_label">
                <label for="username">Nom d'usager</label>
            </div>
            <div class="usager_input">
                <input type="text" name="username" id="username" />
            </div>

            <div class="mdp_label">
                <label for="password">Mot de passe</label>
            </div>
            <div class="usager_input">
                <input type="password" name="password" id="pwd" />
            </div>

            <div class="button_div">
                <button type="submit">Connexion</button>
            </div>
        </form>
    </div>
</div>

