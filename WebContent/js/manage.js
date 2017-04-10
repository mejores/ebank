/*var products = [
		    {productid:'12',name:'督导动态'},
		    {productid:'21',name:'区县信息'},
		    {productid:'22',name:'督导报告'},
		    {productid:'23',name:'督导研究'},
		    {productid:'31',name:'组织机构'},
		    {productid:'32',name:'政策法规'}
		    
		];*/
		$(function(){
			$('#tt').datagrid({
				title:'信息管理',
				iconCls:'icon-edit',
				loadMsg:'数据加载中......',
				//fit:true,
				width:960,
				height:488,
				singleSelect:true,
				/*分页  */
				//pagination: true,
				//idField:'itemid',
				url:'GetUsers.do',
				//url:'data/datagrid_data.json',
				columns:[[
				          { field: 'eid', title: '银行账号', width: 180, align: 'left' },
			                { field: 'username', title: '账户名', width: 150, align: 'left' },
			                { field: 'usertype', title: '账户类型', width: 150, align: 'left', editor:'text' },
			                { field: 'balance', title: '账户余额', width: 150, align: 'left', editor:'text' },
			               /* { field: 'usertype', title: '类别', width: 70, align: 'left',
			                	editor:{
			                		type:'combobox',
			                		options:{
			                            valueField:'productid',
			                            textField:'name',
			                            data:products,
			                            required:true,
			                            editable:false
			                        }
			                	}},
			                { field: 'balance', title: '余额', width: 70	, align: 'left' , editor:'text'},
					*/
					{field:'action',title:'操作',width:80,align:'center',
						formatter:function(value,row,index){
							if (row.editing){
								var s = '<a href="#" onclick="saverow(this)">保存</a> ';
								var c = '<a href="#" onclick="cancelrow(this)">撤销</a>';
								return s+c;
							} else {
								var e = '<a href="#" onclick="editrow(this)">编辑</a> ';
								var d = '<a href="#" onclick="deleterow(this)">删除</a>';
								return e+d;
							}
						}
					}
				]],
				
		          toolbar: [ '+','+','-',  '-', {
		                text: '编辑',
		                iconCls: 'icon-edit',
		                handler: handleEdit,
		            },'-', '-', {
		                text: '删除',
		                iconCls: 'icon-remove',
		                handler: function () { 
		                	//删除时先获取选择行
		                     var rowt = $('#tt').datagrid('getSelected');
		                     //选择要删除的行
		                    // alert("ddd");
		                     if (rows.length > 0) {
		                         $.messager.confirm("提示", "你确定要删除吗?", function (r) {
		                             if (r) {
		                                 /* var ids = [];
		                                 for (var i = 0; i < rows.length; i++) {
		                                     ids.push(rows[i].ID);
		                                 }
		                                 //将选择到的行存入数组并用,分隔转换成字符串，
		                                 //本例只是前台操作没有与数据库进行交互所以此处只是弹出要传入后台的id
		                                 alert(ids.join(',')); */
		                            	 alert("rows.con_title");
		                             }
		                         });
		                     }
		                     else {
		                         $.messager.alert("提示", "请选择要删除的行", "error");
		                     }
		                }
		            }, '-', '-', {
		                text: '保存',
		                iconCls: 'icon-save',
		                handler: function () { 
		                	//保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
		                     datagrid.datagrid("endEdit", editRow);
		                }
		            },'-', '-',  {
		                text: '撤销',
		                iconCls: 'icon-cancel',
		                handler: cancelrow ,
		            }], 
				
				
				onBeforeEdit:function(index,row){
					row.editing = true;
					updateActions(index);
					$('#tt').datagrid('refreshRow', index);
				},
				//编辑过后
				 onAfterEdit: function (index, row ,changes) {
		                //console.info(rowData);
		                row.editing = false;
		               // alert(rowData)
		               // $.ajax({
		               //     url: 'xxxxxx', data: rowData, type: 'POST', complete: function (xhr) {
		               //         alert(xhr.responseText)
		                //    }
		               // });
		               // editRow = undefined;
		                updateActions(index);
						$('#tt').datagrid('refreshRow', index);
						//var rowDate = JSON.stringify(row);
						 $.ajax({
							url:'update.do',
							method:'post',
							data:{'updateInfo':JSON.stringify(changes),"conId":row.con_id},//要传回的数据
							success:function(result){
								
							}
						}); 
						 $('#tt').datagrid('reload');

		            },
			
				onCancelEdit:function(index,row){
					row.editing = false;
					updateActions(index);
					$('#tt').datagrid('refreshRow', index);
				}
			});
			$('#plate').combobox({
				onSelect:function(rec){
					$('#tt').datagrid('load',{
			    		//itemid: $('#itemid').val(),
			    		plate:$('#plate').combobox("getValue")
			    	});
				}
			});
		});
		
		//编辑  
	      function handleEdit(){  
	          var select = $("#tt").datagrid('getSelected');  
	            
	          if(select){  
	                /* $('#edit').window('open');  
	                $('#condoPriceForm').show();  
	                $('#condoPriceForm').appendTo('#editConPrice');  
	                $('#name').val(select.name);  
	                $('#bargainDay').datebox('setValue', select.bargainDay);  
	                $('#bargainPrice').val(select.bargainPrice);  
	                $('#bargainArea').val(select.bargainArea);  
	                $('#id').val(select.id);  
	                $('#condoId').val(select.condoId);  
	                $('#name').attr("readonly", true);  
	                $('#name').css("color", "red");   */
	                
	        	  $('#tt').datagrid('beginEdit', getRowIndex(select));
	          }else{  
	            $.messager.alert('warning','请选择一行数据','warning');  
	          }   
	      }  
		
		
		function updateActions(index){
			$('#tt').datagrid('updateRow',{
				index: index,
				row:{}
			});
		}
		function getRowIndex(target){
			//alert("getRowIndex");
			var tr = $(target).closest('tr.datagrid-row');
			return parseInt(tr.attr('datagrid-row-index'));
		}
		function editrow(target){
			$('#tt').datagrid('beginEdit', getRowIndex(target));
		}
		function deleterow(target){
			$.messager.confirm('Confirm','确定删除吗?',function(row){
				if (row){
					//alert(target);
					//alert(getRowIndex(target))
					var rows = $('#tt').datagrid('getSelected');
					//var select = $("#tt").datagrid('getSelected')
					$('#tt').datagrid('deleteRow', getRowIndex(target));
					 $.ajax({
							url:'delete.do',
							method:'post',
							data:{"conId":rows.con_id,"conNo":rows.con_no},//要传回的数据
							dataType:'text',
							success:function(dmsg){
								if(dmsg=="success"){
								alert("删除成功");}else{
									alert("删除失败")
								}
							}
						}); 
					// $('#tt').datagrid('deleteRow',getRowIndex(target)); 
					// $('#grid').datagrid('reload')
				}
			});
		}
		
		    function doSearch(){
		    	$('#tt').datagrid('load',{
		    		//itemid: $('#itemid').val(),
		    		search: $('#productid').val(),
		    		dfrom:$('#dfrom').datebox("getValue"),
		    		dto:$('#dto').datebox("getValue"),
		    		plate:$('#plate').combobox("getValue")
		    	});
		    }
		 function plate_select(){
				$('#tt').datagrid('load',{
		    		//itemid: $('#itemid').val(),
		    		plate:$('#plate').combobox("getValue")
		    	});
			}
		 //保存更改时触发
		 function saverow(target){
				$('#tt').datagrid('endEdit', getRowIndex(target));
			}
		
		//撤销
		function cancelrow(target){
			$('#tt').datagrid('cancelEdit', getRowIndex(target));
		}

		
		
	//更改筛选处的日期格式
		 function myformatter(date){
			  	var y = date.getFullYear();
			  	var m = date.getMonth()+1;
			  	var d = date.getDate();
			 	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
			  }
			  function myparser(s){
			  	if (!s) return new Date();
			  	var ss = (s.split('-'));
			  	var y = parseInt(ss[0],10);
			  	var m = parseInt(ss[1],10);
			  	var d = parseInt(ss[2],10);
			  	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			  		return new Date(y,m-1,d);
			  	}else{
			  		return new Date();
			  }
			  }
	
		
		
