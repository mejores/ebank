$(function(){
	updateMessages();
});
function updateMessages(){
	$.getJSON("getMessages",function(messageslist){
		var temp="";
		if(messageslist.url!=null){
			location.href=messageslist.url;
		}else{
		$("#info-content").children("ul").empty();
		$.each(messageslist, function(idx, obj) {
		   // alert(obj.from);
		 //   if(obj.type=="转账"){
			var json_data = JSON.stringify(obj); 
			temp="<li><a data-toggle='modal' data-target='#myModal' onclick='messview("+json_data+")'>#{name}#{content}</a></li>"
		    	temp=temp.replace("#{name}",obj.from);
		    	temp=temp.replace("#{content}",obj.content);
		    	temp=temp.replace("#{obj}",obj);
		    	//alert(temp);
		    	$("#info-content").children("ul").append(temp);
		 //   }
		});
		}
	})
}
function timeformat(mdate){
	var date = new Date(mdate.time);
	var dateStr = date.getFullYear() + '-' + date.getMonth() + 
	'-' + date.getDate()+" "+date.getHours()+':'+date.getMinutes();
	return dateStr;
}

function messview(objt){
	//alert(objt.from);
	var arrUl = $("#mess_con");  
	arrUl.empty();
	var temp="<p>对方账号：#{from}</p><p>操作时间：#{date}</p><p>事件类型：#{type}</p><p>事件内容：#{content}</p><p>备注：#{info}</p>"
		temp=temp.replace("#{from}",objt.from);
	temp=temp.replace("#{date}",timeformat(objt.mesDate));
	temp=temp.replace("#{type}",objt.type);
	temp=temp.replace("#{content}",objt.content);
	if(objt.info!=""){
		temp=temp.replace("#{info}",objt.info);
	}else{
		temp=temp.replace("#{info}","无备注");
	}
	
	arrUl.append(temp);
	var param={"m_id":objt.id,"is_readed":'是'};
	//alert(param.toString());
	$.post("setMessage",param,function(){
		
	});

}
