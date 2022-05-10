<?php
    require_once("action/commonAction.php");
    require_once("action/DAO/ResultDAO.php");

    class HistoriqueAction extends CommonAction{
        public function __construct(){
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction(){
            $result = ResultDAO::getResult();

            return compact("result");
        }
    }