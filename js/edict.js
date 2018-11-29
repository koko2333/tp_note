//获取home页创建的保存笔记内容的临时储存
function get_note(){
    var title=sessionStorage.getItem("title");
    if(title){
        //如果有名为title的临时储存
        //就把see内存的标题和笔记加载到对应位置
        document.getElementById("title").value=title;
        document.getElementById("wang").firstElementChild.innerHTML=unescape(sessionStorage.getItem("note"));
        //然后定义一个值为1（为1表示是更新，为0表示新建）
        is_update=1;
    }else{
        is_update=0;
    }
}
get_note();
get_name();
//点击保存笔记按钮
document.getElementById("save").onclick=function(){
    var title=document.getElementById("title").value;
    if(title){
    //播放加载动画
    document.getElementsByClassName("loding")[0].style.display="block";
    document.getElementsByTagName("main")[0].style.opacity=".4";
    //获取标题和笔记内容
    var name=document.getElementById("wellcome").firstElementChild.innerHTML;
    var note=escape(editor.txt.html());
    var note_txt=escape(editor.txt.text());
    var note_id=sessionStorage.getItem("note_id");
    //传到php
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //请求方式，请求url(后端接口，api),同步或者异步
    //POST方法，string()类型向服务器发送请求
    xmlhttp.open("POST", "note.php", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //post方式传参，string 类型
    xmlhttp.send("name="+name+"&& title="+title+"&& note="+note+"&& note_txt="+note_txt+"&& is_update="+is_update+"&& note_id="+note_id);
    //响应事件
    xmlhttp.onreadystatechange = function () {
        //响应状态
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //获取数据
            var str=xmlhttp.responseText;
            //如果数据返回为ok，建立一个临时储存，表示这边已经编辑了笔记了
            //然后home页如果看见了这个临时储存，就会刷新页面
            if(str=="ok"){
                window.opener=null;
                window.open('','_self');
                window.close();
            }
        }
    }
}else{
    alert("请输入标题");
}
}