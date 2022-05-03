<?php
    require_once("action/DAO/Connection.php");

    class ResultDAO{

        public static function getResult(){

            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM resultat");
            //$statement->bindParam(1,$var); permet de se protégez des SQL injections
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $rows = $statement->fetchAll();
            
             return $rows;
        }

        public static function addResult ($joueur, $opposant, $date, $gagnant){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO resultat (joueur, opposant, date, gagnant) VALUES(?,?)");
            $statement->bindParam(1,$author); //se protégez des SQL injections
            $statement->bindParam(2,$answer); // se protégez des SQL injections
            $statement->execute();
            
           return [];
        }
    }
?>
