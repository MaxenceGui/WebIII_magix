<?php
    require_once("partial/header.php");
    require_once("action/historiqueAction.php");

    $action = new HistoriqueAction();
    $data = $action->execute();
?>

<div id="historique">
    <div class="presentationPartie">
        <div class="partieResultat">
            <div class="case">Joueur</div>
            <div class="case">Opposant</div>
            <div class="case">Date</div>
            <div class="case">Gagnant</div>
        </div>
        <?php
            foreach ($data["result"] as $row){
                ?>
                <div class="partieResultat">
                    <div class="case">
                        <?= $row["joueur"] ?>
                    </div>
                    <div class="case">
                        <?= $row["opposant"] ?>
                    </div>
                    <div class="case">
                        <?= $row["journee"] ?>
                    </div>
                    <div class="case">
                        <?= $row["gagnant"] ?>
                    </div>
                </div>
        <?php
            }
        ?>
        <div class="caseVictoire"></div>
        <div class="historiqueBouton">
            <button onClick="supprimerBD()">supprimer historique de partie</button>
            <button onClick="revenirLobby()">Lobby</button>
        </div>
    </div>
</div>




   