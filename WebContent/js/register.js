$(function(){
	
})
var isvalid="false";
//检测用户是否存在
function isExists(){
	var username=$("#username").val();
	if(username!=""){
		$.ajax({
			url:'IsExist.do',
			method:'post',
			data:{"toUsername":username},//要传回的数据
			dataType:'text',
			success:function(msg){
				if(msg=="fail"){
					isvalid="true"
					$("#warname").html("该账号可用");
					$("#warname").css("visibility","visible");
					$("#warname").css("color","green");
				}else{
					$("#warname").html("该账号已被占用");
					$("#warname").css("visibility","visible");
					$("#warname").css("color","red");
				}
			}
		}); 
	}
}

function checkUname(){
	var username=$("#username").val();
	if(username.trim().length<3||username.trim().length>15){
		$("#warname").html("用户名需3到15位");
		$("#warname").css("visibility","visible");
		$("#warname").css("color","red");
		return false;
	}
	return true;
}
function checkPassword(){
	var password=$("#password").val();
	if(password.trim().length<3||password.trim().length>15){
		$("#warpass").html("密码需3到15位");
		$("#warpass").css("visibility","visible");
		$("#warname").css("color","red");
		return false;
	}
	return true;
}

function checkRepassword(){
	var password=$("#password").val();
	var repassword=$("#repassword").val();
	if(password!=repassword){
		$("#warrepass").html("前后密码不一致");
		$("#warrepass").css("visibility","visible");
		$("#warrename").css("color","red");
		return false;
	}
	return true;
}

function regi(){
	if(checkUname()&&checkPassword()&&checkRepassword()){
		var username=$("#username").val().trim();
		var password=$("#password").val().trim();
		var param={"username":username,"password":password};
		 $.post("Register.do",param,function(msg){
			if(msg=="success"){
				$("#warrepass").html("注册成功，请等待管理员审核");
				$("#warrepass").css("visibility","visible");
				$("#warrename").css("color","green");
			}
		}) 

	}
}


    
   /*  function register(){
    	alert("注册");
    } */
  //验证数据用户名是否存在
    function regBlur(){
    	isExists()
    }
    function regFocus(){
    	$("#warname").css("visibility","hidden"); 
    }
    