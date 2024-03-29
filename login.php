<?php
    require_once("action/loginAction.php");
    require_once("partial/header.php");

    $action = new LoginAction();
    $data = $action->execute();
?>

<div id="zoneAccueil">
    <div class="chaton"></div>
    <div class="character"></div>
    <h1 class="titre"> Connexion </h1>
    <h1 class="magix">MAGIX</h1>
    <div>
        <?php if($data["hasConnectionError"]){
            ?>
            <div class="erreur">Votre mot de passe ou nom d'utilisateur est erroné</div>
            <?php
            }
            ?>
    </div>
    <div id="accueil">
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

