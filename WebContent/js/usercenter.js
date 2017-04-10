$(function(){
	loadview();
});
function loadview(){
	$.getJSON("getMessages",{"type":"1"},function(messageslist){
		if(messageslist.url!=null){
			location.href=messageslist.url;
		}else{
		var ii=0;
		$.each(messageslist, function(idx, obj) {
			ii+=1;
			})
		}
		$("#checkmess").children("span").append("("+ii+")");
		});
	
	$.getJSON("index",function(info){
		info=info.data;
		var temp="<p id='userid'> 账&nbsp&nbsp&nbsp号&nbsp&nbsp&nbsp：<span>#{userid}</span><br></p>"+
        "<p>用&nbsp户&nbsp名&nbsp：<span>#{username}</span><br></p>"+
        "<p>账户类型：<span>#{balance}</span><br></p>"+
        "<p>余&nbsp&nbsp&nbsp额&nbsp&nbsp&nbsp：<span>￥#{balance}</span></p>"
        if(info!=null){
        	$("#info-content").empty();
        	temp=temp.replace("#{userid}",info.eid);
        	temp=temp.replace("#{username}",info.username);
        	temp=temp.replace("#{balance}",info.usertype);
        	temp=temp.replace("#{balance}",info.balance);
        	$("#info-content").append(temp);
        	if(info.usertype=="管理员"){
        		$("#manage").css("display","");
        	}
        }
	});

	
	
}
function changep(){
	  var username=$("#username").val();
	  var oldpass=$("#oldpass").val();
	  var newpass=$("#newpass").val();
	  var renewpass=$("#renewpass").val();
	  if(newpass==renewpass){
	  $.ajax({
			url:'ChangePassword.do',
			method:'post',
			data:{"username":username,"oldpass":oldpass,"newpass":newpass},//要传回的数据
			dataType:'text',
			success:function(msg){
				if(msg=="success"){
					alert("更改成功");
					location.href="logout.do";
				}else if (msg=="cre"){
					$("#rems").text("* 初始密码不正确");
				}else{
					$("#rems").text("* 更改失败");
					// $("#rems").attr("html","账户名或密码错误");
				}
			}
		}); 
	  }else{
		  alert("两次输入的新密码不一致！");
	  }
};
//验证数据用户名是否存在
function tranBlur(){
	var toUsername=$("#toUsername").val();
	if(toUsername!=""){
		$.ajax({
			url:'IsExist.do',
			method:'post',
			data:{"toUsername":toUsername},//要传回的数据
			dataType:'text',
			success:function(msg){
				if(msg=="fail"){
					$("#isExist").css("visibility","visible"); 
				}
			}
		}); 
	}
	
}
function tranFocus(){
	$("#isExist").css("visibility","hidden"); 
}
//转账
function transfer(){
	var toUsername=$("#toUsername").val();
	 var userid=$("#userid").text();
	 var sum=$("#sum").val();
	 if(username!=""&&sum!=""){
		 $.ajax({
				url:'Transfer.do',
				method:'post',
				data:{"toUsername":toUsername,"userid":userid,"sum":sum,"ttype":"dual"},//要传回的数据
				dataType:'text',
				success:function(msg){
					if(msg=="success"){
						alert("转账成功"); 
					}else if(msg=="notEnough"){
						alert("余额不足");
					}else{
						alert("转账失败")
					}
				}
			}); 
	 }else{alert("请输入金额")}
}