<?php
$name =$_POST["name"];
//连接数据(ip 端口 用户名 密码 )
$con=mysqli_connect('35.231.17.221','tp','19951229Benwo.','tp_note');
$table_name="note".$name;
//写sql语句
$sql="SELECT * FROM $table_name";
$res=mysqli_query($con,$sql);
if($res){
    $rows=array();
    while($row=mysqli_fetch_assoc($res)){
        $rows[]=$row;
    }
    $data=json_encode($rows);
    echo $data;
}else {
    echo mysqli_error($con);
}
?>