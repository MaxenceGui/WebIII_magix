<?php
    
    class Connection{

        private static $connection = null;

        public static function getConnection(){

            if(Connection::$connection == null){
                Connection::$connection = new PDO(DB_HOST, DB_USER, DB_PASS);
                // les constantes doivent être défini dans le fichier constant.php et appelé par le commonAction 'required_once'
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }

            return Connection::$connection;
        }
    }
?>