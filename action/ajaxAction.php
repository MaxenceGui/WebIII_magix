<?php
	require_once("action/CommonAction.php");
    require_once("action/DAO/ResultDAO.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {

            $result = "";
            $data = [];
            $data["key"] = $_SESSION["key"];

            if(!empty($_POST["type"])){

                $type = $_POST["type"];
                $data["type"] = $type;

                if(!empty($_POST["uid"])){

                    $uid = $_POST["uid"];
                    $data["uid"] = $uid;

                    if(!empty($_POST["targetuid"])){
                        $targetuid = $_POST["targetuid"];
                        $data["targetuid"] = $targetuid;
                    }

                    $result = CommonAction::callAPI("games/action", $data);
                }
                else{
                    
                    $result  = CommonAction::callAPI("games/auto-match", $data);
                }
            }
        elseif(!empty($_POST["gagnant"])){
                $joueur = $_POST["joueur"];
                $opposant = $_POST["opposant"];
                $gagnant = $_POST["gagnant"];
                ResultDAO::addResult($joueur, $opposant, $gagnant);
        }
        else{
            if(!empty($_POST["vider"])){
                ResultDAO::deleteResult();
            }
            if(!empty($_POSt["deck"])){
                $result = $data["key"];
            }
            else{
                $result = CommonAction::callAPI("games/state", $data);
            }
        }
			return compact("result");
		}
	}