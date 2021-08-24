//FormPoint--表单提示
function getLength(str) {
    // 获取字符长度
    return str.replace(/[^\x00-xff]/g, "lu").length;
}

function findStr(str, n) {
    // 反馈密码字符并判断长度
    //console.log(n);
    var tmp = 0,
        i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == n) { tmp++ }
    }
    return tmp;
}

window.onload = function() {
    // 各输入框提示和特效
    var ainput = document.getElementsByTagName("input"),
        oName = ainput[0],
        pwd = ainput[1],
        pwd2 = ainput[2],
        aP = document.getElementsByTagName("p"),
        name_msg = aP[0],
        pwd_msg = aP[1],
        pwd2_msg = aP[2],
        count = document.getElementById("count"),
        aEm = document.getElementsByTagName("em"),
        name_length = 0;
    //1.数字,字母(不分大小写),汉字,下划线
    //2.5-25个字符,推荐使用中文会员名
    var re = /[^\w\u4e00-\u9fa5]/g;
    //用户名
    oName.onfocus = function() {
        // user获得焦点
        // console.log(name_msg);
        name_msg.style.display = "block";
        name_msg.innerHTML = '<i class="ati"></i>5-25个字符,一个汉字为了两个字符,推荐使用中文会员名';
    }
    oName.onkeyup = function() {
        // 获取字符长度并显示
        count.style.visibility = "visible";
        name_length = getLength(this.value);
        count.innerHTML = name_length + "个字符";
        if (name_length == 0) { count.style.visibility = "hidden"; }
    }
    oName.onblur = function() {
        // 含有非法字符
        count.style.visibility = "visible";
        if (re.test(this.value)) { name_msg.innerHTML = '<i class="err"></i>含有非法字符'; }
        //不能为空
        else if (this.value == "") { name_msg.innerHTML = '<i class="err"></i>不能为空'; }
        //长度超过25个字符
        else if (name_length > 25) { name_msg.innerHTML = '<i class="err"></i>长度超过25个字符'; }
        //长度少于6个字符
        else if (name_length < 6) { name_msg.innerHTML = '<i class="err"></i>长度少于6个字符'; }
        //OK
        else { name_msg.innerHTML = '<i class="ok"></i>OK'; }
        //密码
        pwd.onfocus = function() {
            // 密码提示
            pwd_msg.style.display = "block";
            pwd_msg.innerHTML = '<i class="ati"></i>6-16个字符,请使用字母、数字或符号的组合密码,不能单独使用字母、数字或符号';
        }
        pwd.onkeyup = function() {
            // 大于5个字符"中"
            if (this.value.length > 5) {
                aEm[1].className = "active";
                pwd2.removeAttribute("disabled");
                pwd2_msg.style.display = "block";
            } else {
                aEm[1].className = "";
                pwd2.removeAttribute("disabled", "");
                pwd2_msg.style.display = "none";
            }
            //大于10个字符"强"
            if (this.value.length > 10) { aEm[2].className = "active"; } else { aEm[2].className = ""; }
        }
        pwd.onblur = function() {
            var m = findStr(pwd.value, pwd.value[0]),
                re_n = /[^\d]/g,
                re_t = /[^a-zA-Z]/g;
            // 不能为空
            if (this.value == "") { pwd_msg.innerHTML = '<i class="err"></i>不能为空'; }
            // 不能使用相同字符
            else if (m == this.value.length) { pwd_msg.innerHTML = '<i class="err"></i>不能使用相同字符'; }
            // 长度应为6-16个字符
            else if (this.value.length < 6 || this.value.length > 16) { pwd_msg.innerHTML = '<i class="err"></i>长度应为6-16个字符'; }
            // 不能全为数字
            else if (!re_n.test(this.value)) { pwd_msg.innerHTML = '<i class="err"></i>不能全为数字'; }
            // 不能全为字母
            else if (!re_t.test(this.value)) { pwd_msg.innerHTML = '<i class="err"></i>不能全为字母'; }
            // OK
            else { pwd_msg.innerHTML = '<i class="ok"></i>OK'; }
        }
    }
    //确认密码
    pwd2.onblur = function() {
        if (this.value != pwd.value) { pwd2_msg.innerHTML = '<i class="ok"></i>两次密码不一致'; }
        // OK
        else { pwd2_msg.innerHTML = '<i class="ok"></i>OK'; }
    }
}