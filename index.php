<!DOCTYPE html>
<html lang="en">
<?php
    include("hidden.php");
    $mysqli = new mysqli($host, $user, $passwd, $dbname);
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="script.js" defer></script>
    <link rel="stylesheet" href="style.css">
</head>

<body onload="get()">
    <div class="contentDiv">
        <div class="innerDiv">country</div>
        <div class="innerDiv">denomination</div>
        <div class="innerDiv">category no.</div>
        <div class="innerDiv">alloy</div>
        <div class="innerDiv">year</div>
    </div>

    <div id="out"></div>
    <div id="nav">ADD RECORD</div>
    <div id="underAddRecord">
        <div class="contentDiv" id="tableForm">
            <div class="innerDiv">
                <select name="country" id="country">
                    <!-- database -->
                    <?php
                        $rs = $mysqli->query("SELECT `name` FROM `country`");
                        while($rec=$rs->fetch_array()){
                            echo "<option value='".$rec['name']."'>".$rec['name']."</option>";
                        }
                        $rs->close(); 
                        ?>
                </select>
            </div>
            <div class="innerDiv"><input type="text" name="denomination" id="denomination"></div>
            <div class="innerDiv"><input type="text" name="category" id="category"></div>
            <div class="innerDiv">
                <select name="alloy" id="alloy">
                    <!-- database -->
                    <?php
                        $rs = $mysqli->query("SELECT `name` FROM `alloy`");
                        while($rec=$rs->fetch_array()){
                            echo "<option value='".$rec['name']."'>".$rec['name']."</option>";
                        }
                        $rs->close(); 
                        ?>
                </select>
            </div>
            <div class="innerDiv"><input type="number" name="year" id="year"></div>
            <div class="check"><button onclick="send()" id="send"><img src="gfx/checked.png" alt="checked" width="30"
                        hight="30"></button>
            </div>
        </div>
    </div>
</body>

</html>