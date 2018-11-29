var reg_comfir_name=/^[a-zA-Z0-9_]{1,16}$/;
        var reg_comfir_password=/^[a-zA-Z0-9_]{4,16}$/;
        //输入框失去焦点时正则验证用户名，密码输入是否合法
        function reg(a,b,c,d){
            var txt_check=document.getElementsByClassName("remind")[c];
            if(b.test(a.value)){
                txt_check.innerHTML="ok";
                txt_check.classList.add("green");
            }else{
                txt_check.classList.add("red");
                txt_check.innerHTML=d+"格式不正确";
            }
        }
        //输入框获取焦点时清空输入框后面的内容
        function remove_class(c){
            var txt_check=document.getElementsByClassName("remind")[c];
            txt_check.classList.remove("green");
            txt_check.classList.remove("red");
            txt_check.innerHTML='';
        }
        //验证两次输入的密码是否相等
        function comfirpassword(a){
            var txt_check=document.getElementsByClassName("remind")[2];
            if(document.getElementsByClassName("password")[0].value==a.value){
                if(document.getElementsByClassName("remind")[1].innerHTML=="ok"){
                    txt_check.innerHTML="ok";
                    txt_check.classList.add("green");
                }else{
                    txt_check.innerHTML="密码格式不正确";
                    txt_check.classList.add("red");
                }
            }else{
                txt_check.classList.add("red");
                txt_check.innerHTML="两次输入密码不一致";
            }
        }
        //延时刷新页面的函数
        function refresh(){
            location.reload();
        }
        //注册按钮
        function register(){
            var name_innerhtml=document.getElementsByClassName("remind")[0].innerHTML;
            var password_innerhtml=document.getElementsByClassName("remind")[1].innerHTML;
            var comfirpassword_innerhtml=document.getElementsByClassName("remind")[2].innerHTML;
            //如果上面三个全部验证ok
            if(name_innerhtml=="ok" && password_innerhtml=="ok" && comfirpassword_innerhtml=="ok"){
                if(document.getElementById("agreen").checked){
                //去数据库搜索有没有当前用户名,搜索期间播放加载动画
                document.getElementsByClassName("loding")[0].style.display="block";
                document.getElementsByTagName("main")[0].style.opacity=".4";
                var xmlhttp;
                var name=document.getElementsByClassName("name")[0].value;
                var password=document.getElementsByClassName("password")[0].value;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                //请求方式，请求url(后端接口，api),同步或者异步
                //POST方法，string()类型向服务器发送请求
                xmlhttp.open("POST", "comfir_name.php", true);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                //post方式传参，string 类型
                xmlhttp.send("name="+name+"&& password="+password);
                //响应事件
                xmlhttp.onreadystatechange = function () {
                //响应状态
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        //获取数据
                        var str=xmlhttp.responseText;
                        console.log(str);
                        if(str=='notok'){
                            //php返回notok说明当前用户名已被使用
                            var alt=document.getElementsByClassName("loding")[0];
                            alt.innerHTML="用户名已存在,请重新输入";
                            alt.style.width="300px";
                            alt.style.borderRadius="5px";
                            setTimeout("refresh()",2500);
                        }else{
                            var user_obj=JSON.parse(str);
                            //当前用户名没被人使用
                            //删除local储存，创建名字为当前注册用户名的临时储存
                            localStorage.removeItem("name");
                            sessionStorage.setItem("name",user_obj[0].name);
                            //打开home页，关闭当前页
                            open("homepage.html");
                            window.opener=null;
                            window.open('','_self');
                            window.close();
                        }
                    }
                }
            }else{
                alert("请勾选同意用户协议");
            }
            }
        }