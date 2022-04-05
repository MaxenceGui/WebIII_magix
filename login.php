<?php
    require_once("action/loginAction.php");

    $action = new LoginAction();
    $data = $action->execute();
?>

<h1> Connection </h1>

<form action="login.php" method="post">
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
