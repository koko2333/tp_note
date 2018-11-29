//密码输入框开关（当密码输入框获取焦点的时候打开开关，这时候按enter建会触发登陆函数）
var switch_password=0;
//开
document.getElementsByClassName("txt_box")[1].onfocus=function(){
    switch_password=1;
}
//关
document.getElementsByClassName("txt_box")[1].onblur=function(){
    switch_password=0;
}
//跳转到注册界面
document.getElementsByClassName("regist")[0].onclick=function(){
    open("regist.html");
}
//检查本地储存有没有存用户的名字（记住我功能）
//有就直接打开home页
function auto_login(){
    var name= localStorage.getItem("name");
    if(name){
        open("homepage.html");
    }
}
auto_login();
//敲键盘登陆
//开关打开敲enter执行登陆函数
document.onkeydown=function(e){
    e=e || window.event;
    if(switch_password){
        if(e && e.keyCode==13){
            tpnote_login();
        }
    }
}
//验证用户名和密码是否为空
function tpnote_login(){
    if(document.getElementsByClassName("txt_box")[0].value==""){
        document.getElementsByClassName("remind")[0].innerHTML="请输入账号";
    }else if(document.getElementsByClassName("txt_box")[1].value==""){
        document.getElementsByClassName("remind")[1].innerHTML="请输密码";
    }else{
    //播放动画
    document.getElementsByClassName("loding")[0].style.display="block";
    document.getElementsByTagName("main")[0].style.opacity=".4";
    //点击登陆按钮传数据到php去验证
    var xmlhttp;
    var name=document.getElementsByClassName("txt_box")[0].value;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //请求方式，请求url(后端接口，api),同步或者异步
    //POST方法，string()类型向服务器发送请求
    xmlhttp.open("POST", "login.php", true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //post方式传参，string 类型
    xmlhttp.send("name="+name);
    //响应事件
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //获取数据
            var str=xmlhttp.responseText;
            //如果php返回零，则说明数据库里面没有该用户
            if(str=="0"){
                alert('没有此用户');
                //去掉动画
                document.getElementsByClassName("loding")[0].style.display="none";
                document.getElementsByTagName("main")[0].style.opacity="1";
            }else{
                var usr_obj=JSON.parse(str);
                //获取用户输入的密码
                var password=document.getElementsByClassName("txt_box")[1].value;
                //如果输入密码和从数据库获取的密码相等
                if(password==usr_obj[0].password){
                    //如果勾选了：记住我
                    if(document.getElementById("rember_me").checked){
                        //创建一个本地储存用户名字
                        localStorage.setItem("name",usr_obj[0].name);
                    }else{
                        //没有勾选记住我，创建一个临时储存用户的名字
                        sessionStorage.setItem("name",usr_obj[0].name);
                    }
                    //打开home页
                    open("homepage.html");
                }else{
                    //密码不正确
                    alert('密码不正确');
                    //关闭动画
                    document.getElementsByClassName("loding")[0].style.display="none";
                    document.getElementsByTagName("main")[0].style.opacity="1";
                }
            }
        }
    }
}
}