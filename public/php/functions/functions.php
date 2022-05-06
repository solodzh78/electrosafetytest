<?php
$mysqli = false;
function connectDB () {
    global $mysqli;
    require 'db.php';	
    $mysqli->query('SET NAMES utf8');
}
function closeDB () {		
    global $mysqli;
    $mysqli->close();
}
function getQuery ($query) {
    global $mysqli;
    connectDB ();
    $result = $mysqli->query($query);
    if(!$result) 
        { echo "Запрос не работает."; }
    while ($row = $result->fetch_assoc()){
        $user_arr[] = $row;
    };
    closeDB ();
    return $user_arr;			
}
function getQueryId ($query) {
    global $mysqli;
    connectDB ();
    $result = $mysqli->query($query);
    if(!$result) 
        { echo "Запрос не работает."; }
    while ($row = $result->fetch_assoc()){
        $user_arr[] = $row["id"];
    };
    closeDB ();
    return $user_arr;			
}
//Проверяет на совпадения в массиве
//Если совпадений нет, возвращает 'true'
//Если совпадения есть, возвращает 'false'
function checkUnique($arr, $elem) {
    $flag = true;
    // echo("elem равно ".var_dump($elem)."</br>");
    for ($j = 0; $j < count($arr); $j++) {
        if ($arr[$j] == $elem) 
            $flag = false;
    }
    return $flag;
}
//Создает массив с $num случайными неповторяющимися вопросами
function getQuestions($arr, $num) {
    $qPool = [];
    for ($i = 0; $i < $num; $i++) {
        $q = random_int(min($arr), max($arr));
        // echo("checkUnique равно ".var_dump(checkUnique($qPool, $q))."</br>");
        while (!checkUnique($qPool, $q))
            $q = random_int(min($arr), max($arr));
        $qPool[$i] = $q;
    }
    return $qPool;
}