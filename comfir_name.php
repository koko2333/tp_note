<?php
    $name=$_POST["name"];
    $password=$_POST["password"];
    //连接数据(ip 端口 用户名 密码 )
    $con=mysqli_connect('35.231.17.221','tp','19951229Benwo.','tp_note');
    //写sql语句
    $sql="SELECT * FROM `user` WHERE `name`='$name'";
    //执行sql
    $res=mysqli_query($con,$sql);
    //获取mysql语句结果
    $rows=array();
    while($row=mysqli_fetch_assoc($res)){
        $rows[]=$row;
    }
    if($rows){
        echo "notok";
        $con->close();
    }else{
        //往user表加数据
        $sql1="INSERT INTO `user` (name,password) VALUES ('$name','$password')";
        $res1=mysqli_query($con,$sql1);
        //新建一个以用户名命名的笔记表
        $table_name='note'.$name;
        $sql3="CREATE table $table_name (note_id int(10) not null auto_increment,title varchar(254) not null,note MediumText,note_txt MediumText,primary key(note_id))";
        $res3=mysqli_query($con,$sql3);
        //在user表里面查找刚加的数据
        $sql2="SELECT * FROM `user` WHERE `name`='$name'";
        $res2=mysqli_query($con,$sql2);
        //获取mysql查找结果
        $rows2=array();
        while($row2=mysqli_fetch_assoc($res2)){
            $rows2[]=$row2;
        }
        $data=json_encode($rows2);
        echo $data;
    }
    $con->close();
?>
