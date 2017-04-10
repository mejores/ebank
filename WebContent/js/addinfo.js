 $(function(){
	 $('#slide').datagrid({
			title:'要关联的消息',
			iconCls:'icon-edit',
			loadMsg:'数据加载中......',
			//fit:true,
			width:660,
			height:350,
			singleSelect:true,
			/*分页  */
			//pagination: true,
			idField:'itemid',
			url:'GetAllInfo.do',
			
			columns:[[
			          { field: 'con_title', title: '标题', width: 170, align: 'left',},
			          { field: 'pub_time', title: '发表时间', width: 120, align: 'right'} ,
			          { field: 'status', title: '是否公开', width: 115, align: 'right'} ,
			          ]],
	 onSelect:function(indx,row){
		 if(document.getElementById("sameto").checked){
			// alert(row.con_title);
			 $("#imgCon").val(row.con_title);
		 	}
			},
			
	 });
 });
 
/* window.onbeforeunload = onbeforeunload_handler;
 window.onunload = onunload_handler;*/
/* function onbeforeunload_handler(){
     var warning="确认退出?";   
     return warning;
     }
    
 function onunload_handler(){
     var warning="谢谢光临";
     alert(warning);
     //如果未提交
     }
 */
 
 document.getElementById("sub_button").onclick = function(){
	 var title=document.getElementById("con_title").value;
	 if(title==null||title==""){
		 alert("标题不能为空");
		 alert(("#con_title").val);
		 return false;
	 }else{
//		 var webf=document.getElementById("webfile");
		 var isUploaded=document.getElementById("isUploaded").value;
		 if(isUploaded=="yes"){
			 return true;
		 }else{
			 alert("网页文件未上传");
			 return false;
		 }
	 }
	 
	};

 
 /*------------------------------------------------------------------  */
 function preview(file)  
 {  
	 var prevDiv = document.getElementById('preview');  
	 if (file.files && file.files[0])  
	 {  
	 var reader = new FileReader();  
	 reader.onload = function(evt){  
	 prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';  
	}    
	 reader.readAsDataURL(file.files[0]);  
	}  
	 else    
	 {  
	 prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';  
	 }  
 }  
 
 function addslide(){
	 var f=$("#picfile").val()
	 if(f==null||f==""){alert("请选择要上传的图片！");}else{
		 if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(f))
	        {

	          alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
	         // return false;
	        }else{	
	 
	 var rows=$('#slide').datagrid('getSelected')
	 if(rows){
			// .准备FormData
	        var picfd = new FormData();
	        var imgCon=document.getElementById("imgCon").value;
			 var comment=document.getElementById("imgComment").value;
			picfd.append("picfile",picfile.files[0]);
			picfd.append("conId",rows.con_id);
			picfd.append("imgCon",imgCon);
			picfd.append("imgComment",comment);
		
		  $.ajax({
				url:'AddSlide.do',
				method:'post',
				//data:{"conId":rows.con_id,"imgCon":imgCon,"comment":comment,"picfd":picfd},//要传回的数据
				//dataType:'text',
				
				contentType:"multipart/form-data",   
        		type:"POST",  
        		data:picfd,  
        		dataType:"text",  
        		processData: false,  // 告诉jQuery不要去处理发送的数据  
        		contentType: false,   // 告诉jQuery不要去设置Content-Type请求头 
				
				
				success:function(amsg){
					if(amsg=="success"){
					alert("添加成功");}else{
						alert("添加失败")
					}
				}
			});  
	
		}
	        
	 
	 
	 
	 else{
		 alert("请选择一行要关联的消息");
	 }
	 }
	 }
 }



/* $("#upbtns").on("onclick",upload());
$("#upbtns").on("onclick",slaveUpload()); */

//上传wordWEB文件
    function upload() {
  
	if($("#webfile").val()==null||$("#webfile").val()==""){alert("WEB文件未选择！")}else{
// .准备FormData
        var fd = new FormData();

     //   fd.append("myfile", myfile.files[0]);
		fd.append("webfile",webfile.files[0]);

// 创建xhr对象
        var xhr = new XMLHttpRequest();
// 监听状态，实时响应
// xhr 和 xhr.upload 都有progress事件，xhr.progress是下载进度，xhr.upload.progress是上传进度
        xhr.upload.onprogress = function(event) {
	       //如果长度可计算
            if (event.lengthComputable) {
            	//alert("长度可以计算");
                var percent = Math.round(event.loaded *100 / event.total);
                
                console.log('%d%', percent);
                $("#upprog").text(percent+"%");
            }
        };
// 传输开始事件
        xhr.onloadstart = function(event) {
	
            console.log('load start');
            $("#upprog").text('开始上传');

            $("#stopbtn").one('click', function() {
            	//终止当前的网络请求
                xhr.abort();
                $(this).hide();
            });

            loading(true);
        };
// ajax过程成功完成事件
        xhr.onload = function(event) {
            console.log('load success');
            $("#upprog").text('上传成功');
            console.log(xhr.responseText);
            var ret = JSON.parse(xhr.responseText);
           // alert(ret.retMsg);
            $("#con_path").val(ret.con_path);
            $("#con_HTML").val(ret.con_HTML);
            $("#isUploaded").val("yes");
            
            addToFlist(ret.retMsg,"webfile","webfile");
        };
// ajax过程发生错误事件
        xhr.onerror = function(event) {
            console.log('error');
            $("#upprog").text('发生错误');
        };
// ajax被取消
        xhr.onabort = function(event) {
            console.log('abort');
            $("#upprog").text('操作被取消');
        };
// loadend传输结束，不管成功失败都会被触发
        xhr.onloadend = function (event) {
            console.log('load end');
            loading(false);
        };
// 发起ajax请求传送数据
        xhr.open('POST', 'Upload.do', true);
        xhr.send(fd);
	}
	if($("#myfile").val()!=null&& $("#myfile").val()!=""){
		slaveUpload();
	}
        
    }
    /*-------------------------------------------------------------------------------------------  */
    //上传附件
        function slaveUpload() {
        	if($("#myfile").val()!=null&& $("#myfile").val()!=""){
// .准备FormData
        var fd = new FormData();
        var files = document.getElementById("myfile").files;
        for(var i=0; i< files.length; i++){
        	fd.append("myfile"+i, myfile.files[i]);
        } 
       // fd.append("myfile", myfile.files[0]);
	//	fd.append("webfile",webfile.files[0]);

// 创建xhr对象
        var xhr = new XMLHttpRequest();
// 监听状态，实时响应
// xhr 和 xhr.upload 都有progress事件，xhr.progress是下载进度，xhr.upload.progress是上传进度
        xhr.upload.onprogress = function(event) {
	       //如果长度可计算
            if (event.lengthComputable) {
            	//alert("长度可以计算");
                var percent = Math.round(event.loaded *100 / event.total);
                
                console.log('%d%', percent);
                $("#upprog").text(percent+"%");
            }
        };
// 传输开始事件
        xhr.onloadstart = function(event) {
            console.log('load start');
            $("#upprog").text('开始上传');

            $("#stopbtn").one('click', function() {
            	//终止当前的网络请求
                xhr.abort();
                $(this).hide();
            });

            loading(true);
        };
// ajax过程成功完成事件
        xhr.onload = function(event) {

            console.log('load success');
            $("#upprog").text('上传成功');
            console.log(xhr.responseText);
           // var ret = JSON.parse(xhr.responseText);
            var json=xhr.responseText;
            json = eval(json);
            for(var i=0; i<json.length; i++){
            	if(json[i].retMsg!=null){
            	addToFlist(json[i].retMsg,json[i].slavePath,"slavefile");
            	
            	}
            }
           /* addToFlist("[附件]"+ret.retMsg);
            $("#slave_log").val(ret.retMsg);
            $("#slave_phi").val(ret.slavePath);*/
            
        };
// ajax过程发生错误事件
        xhr.onerror = function(event) {
            console.log('error');
            $("#upprog").text('发生错误');
        };
// ajax被取消
        xhr.onabort = function(event) {
            console.log('abort');
            $("#upprog").text('操作被取消');
        };
// loadend传输结束，不管成功失败都会被触发
        xhr.onloadend = function (event) {
            console.log('load end');
            loading(false);
        };
// 发起ajax请求传送数据
        xhr.open('POST', 'SlaveUpload.do', true);
        xhr.send(fd);
       }
        
    }
  /*-----------------------------------------------------------------------------------------  */  
    
    function addToFlist(log_name,phy_name,type) {
    	var gname=log_name;
    	if(gname.length>23){gname=gname.substring(0,21)+"......"};
    	var temp =[];
    	if(type=="slavefile"){
    		gname="[附件]"+gname;
    		temp = ["<p id='" + phy_name + "' title='"+log_name+"' class='easyui-tooltip'>",
                    // alert(fname),
                     gname,"<input type='hidden' name='slaves' value='"+phy_name+"|"+log_name+"'>",
             		
             /*"<button onclick='delFile(\"" + phy_name + "\");'>删除</button>",*/
             		"<input type='button' value='删除' onclick='delFile(\"" + phy_name + "\");'>",
             "</p>"
         ];}else{
        	 temp = ["<p id='" + phy_name + "' title='"+log_name+"' class='easyui-tooltip'>",
                      gname,
              		"<input type='button' value='删除' onclick='delFile(\"" + phy_name + "\");'>",
              "</p>"
        	]; };
    	
    	
         
      
        
        $("#filelist").append(temp.join(""));
    }
    //删除已经上传的文件
    function delFile(fname) {
        console.log('to delete file: ' + fname);
        //var comment=document.getElementById("imgComment").value;
	  $.ajax({
			url:'DeleteUploaded.do',
			method:'post',
    		data:{"fname":fname},
    		dataType:'text',
    		/*processData: false,  // 告诉jQuery不要去处理发送的数据  
    		contentType: false,*/   // 告诉jQuery不要去设置Content-Type请求头 
			success:function(dmsg){
				if(dmsg=="success"){
					 document.getElementById("filelist").removeChild(document.getElementById(fname));}
			}
		});  
// TODO: 请实现  ---待处理：web文件的删除处理，web文件没有传入物理名称
    }
    function loading(showloading) {
        if (showloading) {
            $("#uptxt").show();
            $("#stopbtn").show();
        } else {
            $("#uptxt").hide();
            $("#stopbtn").hide();
        }
    }
