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

            $statement = $connection->prepare("INSERT INTO resultat (joueur, opposant, gagnant) VALUES(?,?,?)");
            $statement->bindParam(1,$joueur); //se protégez des SQL injections
            $statement->bindParam(2,$opposant); // se protégez des SQL injections
            $statement->bindParam(3,$gagnant); // se protégez des SQL injections
            $statement->execute();
            
           return [];
        }

        public static function deleteResult (){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("TRUNCATE resultat");
            $statement->execute();
            
           return [];
        }
    }
?>
