<?php
require_once './functions/functions.php';	
$gruppa = $_GET['gruppa'];
$all_id = getQueryId (stripcslashes("SELECT id FROM \`gruppa".$gruppa."\`"));
$questions = getQuestions($all_id, 10);
$query = stripcslashes("SELECT * FROM \`gruppa".$gruppa."\` WHERE id IN(".implode(',',$questions).")");
echo json_encode(getQuery ($query));
exit; // - обязательно	
?>