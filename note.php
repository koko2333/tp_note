<?php
$name =$_POST["name"];
$title =$_POST["title"];
$note =$_POST["note"];
$note_txt =$_POST["note_txt"];
$is_update=$_POST["is_update"];
$note_id=$_POST["note_id"];
//连接数据(ip 端口 用户名 密码 )
$con=mysqli_connect('35.231.17.221','tp','19951229Benwo.','tp_note');
$table_name="note".$name;
if($is_update == "1"){
    //写更新的sql语句
    $sql1="UPDATE $table_name SET note = '$note',title='$title',note_txt='$note_txt' WHERE note_id='$note_id'";
    //执行
    if(mysqli_query($con,$sql1)){
        echo "ok";
    }else {
        echo mysqli_error($con);
    }
}else if($is_update == "0"){
    //写sql语句
    $sql="INSERT INTO $table_name (title,note,note_txt) VALUES ('$title','$note','$note_txt')";
    //执行
    if(mysqli_query($con,$sql)){
        echo "ok";
    }else {
        echo mysqli_error($con);
    }
}
?>