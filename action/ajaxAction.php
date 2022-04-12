<?php
	require_once("action/CommonAction.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {

            $result = "";

            if(!empty($_POST["type"])){
                $type = $_POST["type"];
                
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["type"] = $type;

                $result  = CommonAction::callAPI("games/auto-match", $data);
            }

			return compact("result");
		}
	}