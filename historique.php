<?php
    require_once("partial/header.php");
    require_once("action/historiqueAction.php");

    $action = new HistoriqueAction();
    $data = $action->execute();
?>

<div>
    <?php
        foreach ($data["result"] as $row){
            ?>
            <div>
                <div>
                    <?= $row["joueur"] ?>
                </div>
                <div>
                    <?= $row["opposant"] ?>
                </div>
                <div>
                    <?= $row["journee"] ?>
                </div>
                <div>
                    <?= $row["gagnant"] ?>
                </div>
            </div>
    <?php
        }
    ?>
</div>

<div class="carteFrame">
    Donkey Kong
    <div class="carteInfo">
        <div class="carteInfoVie">3</div>
        <div class="carteInfoAtk">3</div>
        <div class="carteInfoCout">2</div>
    </div>
    <div class="carteImg"></div>
    <div class="carteInfoHab">info ici!</div>
</div>
<button onClick="supprimerBD()">supprimer historique de partie</button>
<button onClick="revenirLobby()">Lobby</button>
   