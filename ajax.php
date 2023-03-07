<?php

include("hidden.php");
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if(isset($_POST['acc']) && $_POST['acc']=='add'){
    $rs = $mysqli->query("SELECT `IdCountry` FROM `country` WHERE `name` ='".$_POST['country']."'");
        while($rec=$rs->fetch_array()){$country=$rec;}
    $rs->close(); 

    $rs = $mysqli->query("SELECT `IdAlloy` FROM `alloy` WHERE `name` = '".$_POST['alloy']."'");
        while($rec=$rs->fetch_array()){$alloy=$rec;}
    $rs->close();
    $mysqli->query("INSERT INTO `monetki` (`IdMonetki`, `IdCountry`, `denomination`, `category`, `IdAlloy`, `year`) VALUES (NULL,'".$country[0]."','".$_POST['denomination']."','".$_POST['category']."','".$alloy[0]."','".$_POST['year']."')");
    /* $sql = "INSERT INTO `monetki`(`IdMonetki`, `IdCountry`, `denomination`, `category`, `IdAlloy`, `year`) VALUES (NULL,?,?,?,?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sssss", rawurldecode($country, $_POST['denomination'], $_POST['category'], $alloy, $_POST['year']));
    $stmt->execute(); */
}else if(isset($_POST['acc']) && $_POST['acc']=='get'){
    $sql = "SELECT `country`.`name`, `monetki`.`denomination`, `monetki`.`category`, `alloy`.`name`, `monetki`.`year` FROM (`monetki` INNER JOIN `country` ON `monetki`.`IdCountry` = `country`.`IdCountry` INNER JOIN `alloy` ON `monetki`.`IdAlloy` = `alloy`.`IdAlloy`);";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
}
?>