$(function(){
	loaduserview();
});
//全局用户名
var uname="";
//当前选中的用户
var checked_press_id="";
//如果状态为待审核，按钮显示：通过审核；标注为黄色
//如果状态为审核未通过，按钮显示：通过审核；--
//如果状态为正常，按钮显示：冻结--黑色
//如果状态为已冻结，按钮显示：解冻--红色

//？消息提示，消息指向没有具体人，可以设置为to:manage
//如果有开户请求，置顶，且用红色标注
//




//初始化页面
function loaduserview(){
	$.getJSON("GetUsers.do",function(userslist){
		var temp="";
		if(userslist.url!=null){
			alert("权限缺失！");
			window.history.go(-1);  
		}else{
		$.each(userslist, function(idx, obj) {
			//var json_data = JSON.stringify(obj); 
			var temp="<tr style='color:#{color}' id='con_"+obj.eid+"' onclick='checked("+obj.eid+","+obj.statu+")'><td>"+obj.eid+"</td><td>"+obj.username+"</td><td>￥"+obj.balance+"</td><td>"+obj.usertype+"</td><td>#{statu}</td></tr>"
			if(obj.statu=="1"){
		    	temp=temp.replace("#{statu}","正常");
				}else if(obj.statu=="2"){
					temp=temp.replace("#{statu}","等待审核");
					temp=temp.replace("#{color}","#EE9A00");
				}else if(obj.statu=="3"){
					temp=temp.replace("#{statu}","审核未通过");
					temp=temp.replace("#{color}","#EE7AE9");
				}else if(obj.statu=="4"){
					temp=temp.replace("#{statu}","已冻结");
					temp=temp.replace("#{color}","#D1D1D1");
				}
		    	//alert(temp);
			$("#datalist").append(temp);
		 //   }
		});
		}
	})
	
}
//当用户点击存入/取出后
function trans(ttype){
	if(checked_press_id!=""){
		$("#mtransfer").modal('show');
		if(ttype=="deposit"){
			$("#transfer").text("存入");
		}else if(ttype=="withdraw"){
			$("#transfer").text("取出");
		}
		
	}else{
		alert("请先选择用户！");
	}
}

//当用户输入存取金额后
function tranBlur(){
	if($("#sum").val()==""){
		$("#mWarning").fadeIn(200);
		$("#mWarning").text("请输入金额");
		$("#mWarning").fadeOut(3000);
		return false
	}
	return true
}

//存入取出---参数决定存入还是取出
function transaction(){
	if(checked_press_id!=""){
		if(tranBlur()){
		var sum =$("#sum").val();
		var ttype="withdraw";
		//如果为存钱
		if($("#transfer").text()=="存入"){
			sum="-"+sum;
			ttype="deposit";
		}
		var param={"userid":checked_press_id,"sum":sum,"ttype":ttype}
		$.post("Transfer.do",param,function(msg){
			$("#mWarning").fadeIn(200);
			if(msg=="success"){
				$("#mWarning").text("成功"); 
			}else if(msg=="notEnough"){
				$("#mWarning").text("余额不足");
			}else{
				$("#mWarning").text("失败")
			}
			$("#mWarning").fadeOut(3000);
		})
		
		}
	}else{
		alert("请先选择用户！");
	}
}

//更改用户状态
function changeStatu(){
	var statu= $("#btnStatu").text();
	if(statu=="通过审核"){
		statu="2to1"
	}else if(statu=="冻结账户"){
		statu="1to4";
	}else if(statu=="解冻账户"){
		statu="4to1";
	}
	var param={"userid":checked_press_id,"statu":statu};
	$.post("changeStatu.do",param,function(msg){
		if(msg=="success"){
			location.reload();
		}
	})
}

//初始化密码
function initPwd(){
	
}

//选中欲操作用户
function checked(id,type){
	//把已经点击过的内容还原；
	if(type=="1"){
    	$("#btnStatu").text("冻结账户");
		}else if(type=="2"){
			$("#btnStatu").text("通过审核");
		}else if(type=="3"){
			$("#btnStatu").text("通过审核");
		}else if(type=="4"){
			$("#btnStatu").text("解冻账户");
		}
	if(checked_press_id!=""){
		$("#con_"+checked_press_id).css("backgroundColor","#fff");
		}
	//改变选中的用户背景
	$("#con_"+id).css("backgroundColor","#ccc");
	checked_press_id=id;
}