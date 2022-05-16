<?php
    require_once("partial/header.php");
    require_once("action/historiqueAction.php");

    $action = new HistoriqueAction();
    $data = $action->execute();
?>

<div id="historique">
    <div class="presentationPartie">
        <div class="caseVictoire"></div>
        <div class="partieResultat">
            <div class="casePresentation">Joueur</div>
            <div class="casePresentation">Opposant</div>
            <div class="casePresentation">Date</div>
            <div class="casePresentation">Gagnant</div>
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
    </div>
    <div class="historiqueBouton">
            <button onClick="supprimerBD()">supprimer historique de partie</button>
            <button onClick="revenirLobby()">Lobby</button>
    </div>
</div>




   