<?php
$name =$_POST["name"];
$note_id =$_POST["note_id"];
//连接数据(ip 端口 用户名 密码 )
$con=mysqli_connect('35.231.17.221','tp','19951229Benwo.','tp_note');
$table_name="note".$name;
//写sql语句
$sql="DELETE FROM $table_name WHERE note_id='$note_id'";
if(mysqli_query($con,$sql)){
    echo "ok";
}else {
    echo mysqli_error($con);
}
?>