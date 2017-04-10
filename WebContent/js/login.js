//初始化页面时验证是否记住了密码
$(document).ready(function() {
      if ($.cookie("resm_cast3ch") == "true") {
       /*    $("#rem_catch").attr("checked", true); */
          $("#username").val(DeEight($.cookie("fmka43ifafluussac")));
          $("#password").val(DeEight($.cookie("sgdhluy87dssa")));
          $("#remember_me").attr("checked",'checked');
      }
      
      $("#username").focus(function(){
    	  $("#rems").text("");
      });
      $("#password").focus(function(){
    	  $("#rems").text("");
      });

  });

	  
	  function EnEight(words){
		    var monyer = new Array();var i,s;
		    for(i=0;i<words.length;i++)
		        monyer+="\\"+words.charCodeAt(i).toString(8); 
		    return monyer;
		}
		/*8进制加密解密*/
		function DeEight(words){
		    var monyer = new Array();var i;
		    var s=words.split("\\");
		    for(i=1;i<s.length;i++)
		        monyer+=String.fromCharCode(parseInt(s[i],8));
		    return monyer;
		}
  
 
   
  function saveUserInfo() {
      if ($("#remember_me").is(":checked")) {
    	  
    	  if ($.cookie("resm_cast3ch") == null||$.cookie("resm_cast3ch") == "") {
          	var userName = EnEight($("#username").val());
          	var passWord = EnEight($("#password").val());
          	$.cookie("resm_cast3ch", "true", {expires:7}); // 存储一个带7天期限的 cookie
          	$.cookie("fmka43ifafluussac", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
          	$.cookie("sgdhluy87dssa", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
    	 }
      }
      else {
          $.cookie("resm_cast3ch", '', { expires: -1 });        // 删除 cookie
          $.cookie("fmka43ifafluussac", '', { expires: -1 });
          $.cookie("sgdhluy87dssa", '', { expires: -1 });
      }
  }
  
  
  function log(){
	  var username=$("#username").val();
	  var password=$("#password").val();
	
	  var param={"username":username,"password":password}
	  $.post('login.do',param,function(msg){
		  if(msg=='success'){
				//saveUserInfo();
				location.href="userCenter.jsp";
			}
		  else if(msg=='verifying'){
			  $("#rems").fadeIn(200);
				$("#rems").text("* 请等待审核");
				$("#rems").fadeOut(3000);
		  } else if(msg=='unpassed'){
			  $("#rems").fadeIn(200);
				$("#rems").text("* 您的开户申请未通过");
				$("#rems").fadeOut(3000);
		  } else if(msg=='freezed'){
			  $("#rems").fadeIn(200);
				$("#rems").text("* 您的账户已被冻结");
				$("#rems").fadeOut(3000);
		  }else{
				$("#rems").fadeIn(200);
				$("#rems").text("* 账户名或密码错误");
				$("#rems").fadeOut(3000);
			}
	  })
  };
  