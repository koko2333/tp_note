<?php
    $name=$_POST["name"];
    $servername = "35.231.17.221";
    $username = "tp";
    $password = "19951229Benwo.";
    $dbname = "tp_note";
    //创建数据库连接
    $conn= mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM `user` WHERE `name`='$name'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $res=array();
    while($row = mysqli_fetch_assoc($result)) {
        $res[]=$row;
        $data=json_encode($res);
        echo $data;
    }
    } else {
    echo "0";
    }
    mysqli_close($conn);
?>