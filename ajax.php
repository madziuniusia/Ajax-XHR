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
}else if(isset($_POST['acc']) && $_POST['acc']=='get'){
    $sql = "SELECT `country`.`name`, `monetki`.`denomination`, `monetki`.`category`, `alloy`.`name`, `monetki`.`year`, `monetki`.`IdMonetki` FROM (`monetki` INNER JOIN `country` ON `monetki`.`IdCountry` = `country`.`IdCountry` INNER JOIN `alloy` ON `monetki`.`IdAlloy` = `alloy`.`IdAlloy`);";
    $result = $mysqli->query($sql);
    $all = $result->fetch_all();
    echo json_encode($all);
} else if(isset($_POST['acc']) && $_POST['acc']=='delete'){
    $mysqli->query("DELETE FROM `monetki` WHERE `IdMonetki`= ".$_POST['deleteRecord']);
} else if(isset($_POST['acc']) && $_POST['acc']=='update'){
    $rs = $mysqli->query("SELECT `IdCountry` FROM `country` WHERE `name` ='".$_POST['country']."'");
        while($rec=$rs->fetch_array()){$country=$rec;}
    $rs->close(); 

    $rs = $mysqli->query("SELECT `IdAlloy` FROM `alloy` WHERE `name` = '".$_POST['alloy']."'");
        while($rec=$rs->fetch_array()){$alloy=$rec;}
    $rs->close();
    
    $mysqli->query("UPDATE `monetki` SET `IdCountry` = $country[0], `denomination` = '".$_POST['denomination']."', `category` = '".$_POST['category']."', `IdAlloy` = $alloy[0] , `year` = '".$_POST['year']."' WHERE `monetki`.`IdMonetki` = ".$_POST['id']);
}
?>