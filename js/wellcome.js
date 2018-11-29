function get_name(){
    //检查本地储存又没用户的名字
    var local=localStorage.getItem("name");
    if(local){
        //有就将用户名显示在“欢迎”后面
        document.getElementById("wellcome").firstElementChild.innerHTML=local;
    }else{
        //没有本地存储就检查临时储存
        var sess=sessionStorage.getItem("name");
        if(sess){
            //有就将用户名显示在“欢迎后面”
            document.getElementById("wellcome").firstElementChild.innerHTML=sess;
        }
    }
}