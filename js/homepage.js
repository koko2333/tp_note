get_name();
get_note();
//获取用户的笔记
function get_note(){
    //播放动画
    document.getElementsByClassName("loding")[0].style.display="block";
    document.getElementsByTagName("main")[0].style.opacity=".4";
    //获取title和note_txt
    name=document.getElementById("wellcome").firstElementChild.innerHTML;
    var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //请求方式，请求url(后端接口，api),同步或者异步
        //POST方法，string()类型向服务器发送请求
        xmlhttp.open("POST", "homepage.php", true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //post方式传参，string 类型
        xmlhttp.send("name="+name);
        //响应事件
        xmlhttp.onreadystatechange = function () {
            //响应状态
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //获取数据，并将其转换成object
                var str=xmlhttp.responseText;
                obj_user=JSON.parse(str);
                console.log(obj_user);
                //结束动画
                document.getElementsByClassName("loding")[0].style.display="none";
                document.getElementsByTagName("main")[0].style.opacity="1";
                load_note();
            }
        }
}
function load_note(){
    var n_of_pages=Math.ceil(obj_user.length/9);
    //将预览内容和笔记标题加载到对应的位置
    if(obj_user.length<=9){
        //第一页加载的内容个数等于obj_user的长度
        var num_of_one_page=obj_user.length;
    }else{
        //第一页加载的内容的个数等于9
        var num_of_one_page=9;
        //加载分页按钮
        for(var i=0;i<n_of_pages;i++){
            //加载第几页
            document.getElementsByClassName("footer")[0].innerHTML+='<mian id='+i+'>第'+(i+1)+'页</main>';
        }
    }
    for(var i=0;i<num_of_one_page;i++){
        var item=document.getElementsByClassName("item")[0];
        //截取预览
        var perview=unescape(obj_user[i].note_txt).slice(0,200);
        item.innerHTML+='<div class="note_box" id="'+i+'"><main>'+perview+'</main><p>'+obj_user[i].title+'</p></div>';
    }
}
//点击页码页的函数
document.getElementsByClassName("footer")[0].onclick=function(e){
    e=e || window.event;
    //如果点的是mian就执行下一步
    if(e.target.tagName.toLowerCase()=="mian"){
        //清空内容
        document.getElementsByClassName("item")[0].innerHTML="";
        if(e.target.id>=0){
            //如果点的按钮是最后一页
            if(e.target.id==Math.floor(obj_user.length/9)){
                for(var i=(e.target.id*9);i<obj_user.length;i++){
                    var item=document.getElementsByClassName("item")[0];
                    //截取预览
                    var perview=unescape(obj_user[i].note_txt).slice(0,200);
                    //添加内容
                    item.innerHTML+='<div class="note_box" id="'+i+'"><main>'+perview+'</main><p>'+obj_user[i].title+'</p></div>';
                }
            }else{
            //添加预览和标题
            for(var i=(e.target.id*9);i<(parseInt(e.target.id)+1)*9;i++){
                var item=document.getElementsByClassName("item")[0];
                //截取预览
                var perview=unescape(obj_user[i].note_txt).slice(0,200);
                //添加内容
                item.innerHTML+='<div class="note_box" id="'+i+'"><main>'+perview+'</main><p>'+obj_user[i].title+'</p></div>';
            }
        }
        }
    }
}
//通过事件代理来获取当先点击节点的id（也就是当前节点的下标）
var item=document.getElementsByClassName("item")[0];
var footer=document.getElementsByClassName("footer")[0];
item.onclick=function(e){
    e=e || window.event;
    //如果点的是main就执行下一步
    //item不显示，编辑box显示，添加内容和标题到编辑box
    if(e.target.tagName.toLowerCase()=="main"){
    box=e.target.parentElement.id;
    item.style.display="none";
    footer.style.display="none";
    var note_show=document.getElementById("note_show");
    note_show.style.display="block";
    note_show.innerHTML='<span id="note_show_title">'+obj_user[box].title+"</span>"+"<br>"+unescape(obj_user[box].note);
    var title_box=document.getElementsByClassName("title_box")[0];
    //添加编辑和返回按钮
    title_box.style.display="block";
    title_box.innerHTML='<span id="edit">编辑</span><span id="del">删除</span><span id="back">返回</span>';
    //返回按钮点击编辑box与返回和编辑按钮不显示，item与我的笔记显示
    document.getElementById("back").onclick=function(){
        note_show.style.display="none";
        title_box.style.display="flex";
        title_box.innerHTML='<p>我的笔记：</p><div><input type="text" id="search" placeholder="搜索标题或笔记内容" onfocus="be_focus(this)" onblur="be_onblur(this)" onmouseover="mouse_over(this)" onmouseout="mouse_leave(this)"><div id="search_btn" onclick="note_search()"><i class="fa fa-search"></i></div><div id="ico_new" onclick=go_to_deict()><span>+</span></div><p id="new_note">新建笔记</p></div>';
        item.style.display="flex";
        footer.style.display="flex";
    }
    //编辑按钮点击的时候创建一个存储了标题和笔记的临时储存并打开edict页面
    document.getElementById("edit").onclick=function(){
        sessionStorage.setItem("note_id",obj_user[box].note_id);
        sessionStorage.setItem("note",obj_user[box].note);
        sessionStorage.setItem("title",obj_user[box].title);
        open("edict.html");
    }
    //点击删除按钮的时候连接到del.php
    document.getElementById("del").onclick=function(){
        //放动画
        document.getElementsByClassName("loding")[0].style.display="block";
        document.getElementsByTagName("main")[0].style.opacity=".4";
        var xmlhttp;
        var note_id=obj_user[box].note_id;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //请求方式，请求url(后端接口，api),同步或者异步
        //POST方法，string()类型向服务器发送请求
        xmlhttp.open("POST", "del.php", true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //post方式传参，string 类型
        xmlhttp.send("note_id="+note_id+"&& name="+name);
        //响应事件
        xmlhttp.onreadystatechange = function () {
            //响应状态
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //获取数据
                var str=xmlhttp.responseText;
                //如果返回ok就刷新当前页面
                if(str=="ok"){
                    location.reload();
                }
            }
        }
    }
}
}   
document.getElementById("ico_new").onclick=function(){
    go_to_deict();
}
//新建文档函数：删临时储存，打开edict页
function go_to_deict(){
    sessionStorage.removeItem("note_id");
    sessionStorage.removeItem("title");
    sessionStorage.removeItem("note");
    open("edict.html");
}
//点击注销就删除本地储存和临时储存并跳回主页
document.getElementById("logout").onclick=function(){
    sessionStorage.removeItem("name");
    localStorage.removeItem("name");
}
var is_onfocus=0;
//搜索框获取与失去焦点长度改变,
//开关打开
function be_focus(a){
    a.style.width="300px";
    is_onfocus=1;
}
//开关关闭
function be_onblur(a){
    a.style.width="150px";
    is_onfocus=0;
}
//搜索框鼠标移上去与移出去改变长度
function mouse_over(a){
    a.style.width="300px";
}
function mouse_leave(a){
    if(is_onfocus){
        a.style.width="300px";
    }else{
        a.style.width="150px";
    }
}
function note_search(){
    var a=1;
    var id_fristnote=document.getElementsByClassName('item')[0].firstElementChild.id;
    if(id_fristnote==Math.floor(obj_user.length/9)*9){
        for(var k=parseInt(id_fristnote);k<obj_user.length;k++){
            document.getElementsByClassName("note_box")[k-(9*(id_fristnote/9))].classList.remove("border");
        }
        var keywords=document.getElementById("search").value;
    for(var i= parseInt(id_fristnote);i<obj_user.length;i++){
        if(obj_user[i].title.indexOf(keywords)!=-1){
            document.getElementById(i).classList.add("border");
            a=0;
        }else if(unescape(obj_user[i].note_txt).indexOf(keywords)!=-1){
            document.getElementById(i).classList.add("border");
            a=0;
        }
    }
    if(a){
        alert("当前页面没有结果");
    }
    }
    else{
    for(var k=parseInt(id_fristnote);k<parseInt(id_fristnote)+9;k++){
        document.getElementsByClassName("note_box")[k-(9*(id_fristnote/9))].classList.remove("border");
    }
    var keywords=document.getElementById("search").value;
    for(var i= parseInt(id_fristnote);i<parseInt(id_fristnote)+9;i++){
        if(obj_user[i].title.indexOf(keywords)!=-1){
            document.getElementById(i).classList.add("border");
            a=0;
        }else if(unescape(obj_user[i].note_txt).indexOf(keywords)!=-1){
            document.getElementById(i).classList.add("border");
            a=0;
        }
    }
    if(a){
        alert("当前页面没有结果");
    }
}
}
//敲键盘搜索
//开关打开敲enter执行搜索函数
document.onkeydown=function(e){
    e=e || window.event;
    if(is_onfocus){
        if(e && e.keyCode==13){
            note_search();
        }
    }
}