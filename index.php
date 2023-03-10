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
        <div class="checkOrDelete"></div>
    </div>

    <div id="out"></div>

    <table id="tableForm">
        <tr>
            <th id="nav" colspan="6">ADD RECORD</th>
        </tr>
        <tr>
            <td>
                <select name="country" id="country">
                    <!-- base -->
                    <?php
                        $rs = $mysqli->query("SELECT `name` FROM `country`");
                        while($rec=$rs->fetch_array()){
                            echo "<option value='".$rec['name']."'>".$rec['name']."</option>";
                        }
                        $rs->close(); 
                        ?>
                </select>
            </td>
            <td><input type="text" name="denomination" id="denomination"></td>
            <td><input type="text" name="category" id="category"></td>
            <td>
                <select name="alloy" id="alloy">
                    <!-- base -->
                    <?php
                        $rs = $mysqli->query("SELECT `name` FROM `alloy`");
                        while($rec=$rs->fetch_array()){
                            echo "<option value='".$rec['name']."'>".$rec['name']."</option>";
                        }
                        $rs->close(); 
                        ?>
                </select>
            </td>
            <td><input type="number" name="year" id="year"></td>
            <td id="checkOrDeleteForm"><button onclick="send()" id="send"><img src="gfx/checked.png"
                        alt="checked"></button></td>
        </tr>
    </table>
</body>

</html>