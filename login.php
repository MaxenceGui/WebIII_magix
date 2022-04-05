<?php
    require_once("action/loginAction.php");

    $action = new LoginAction();
    $data = $action->execute();
?>