<?php
    require_once("action/commonAction.php");

    class GameAction extends CommonAction{
        public function __construct(){
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction(){
            $chat = "https://magix.apps-de-cours.com/server/#/chat/" . $_SESSION["key"];
            return compact("chat");
        }
    }