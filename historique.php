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
                    <?= $row["journée"] ?>
                </div>
                <div>
                    <?= $row["gagnant"] ?>
                </div>
            </div>
            <?php
        }
    ?>
</div>
<button onClick="supprimerBD()">supprimer historique de partie</button>
<button onClick="revenirLobby()">Lobby</button>
   