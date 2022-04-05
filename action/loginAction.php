<?php
    require_once("action/commonAction.php");

    class LoginAction extends CommonAction{
        
        public function __construct(){
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction(){

            $hasConnectionError = false;

            if(isset($_POST["username"])){
                $data = [];
                $data["username"] = $_POST["username"];
                $data["passwordd"] = $_POST["password"];

                $result = CommonAction::callAPI("signin", $data);

                if($result != "INVALID_USERNAME_PASSWORD"){
                    var_dump($result);
                    exit;
                    // $_SESSION["key"] = $result->key;
                    // header("location:index.php");
                    // exit;
                }
                else{
                    $hasConnectionError = true;
                }
            }
            
            return compact("hasConnectionError");
        }
    }