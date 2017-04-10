<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <link rel="stylesheet" href="js/lib/bootstrap.min.css">
    <title>消息--新司机银行</title>
    <style rel="stylesheet">
     
        #logContent{
            float: right;
            margin-right: 6%;
        }
        #info-title{
            margin: 3%;
            margin-left: 6%;
            margin-right: 6%;
        }
        #info-title p{
            color: #1d5678;

            background-color: rgba(137, 170, 236, 0.15);
        }
        #info-content{
            width: 80%;
            margin: 7% auto;
            margin-left: 29%;
            margin-top:-10px
        }
      
    </style>

    
<title>消息列表</title>
</head>
<body>
<div id="logContent">
<c:if test="${sessionScope.username!=null}">
<span>${sessionScope.username }</span>
    <a href="logout.do">注销</a>
    </c:if>
    <c:if test="${sessionScope.username==null}">
    <a href="login.html">登录/注册</a>
    </c:if>
</div>
<div id="info-title">
    <p> 查看消息>消息列表</p>
</div>
<div id="myinfo">
    <div id="btn-g">
		
        
    </div>
    <hr>
    <div id="info-content">
      <ul>
		<li><a data-toggle="modal" data-target="#myModal">张三向你转了一笔钱</a></li>
		<li><a>你的账号已通过审核</a></li>
		
		
		</ul>
    </div>

</div>


<!-- 查看消息模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog "style="height: 300px;width: 400px；heigt">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h6 class="modal-title" id="myModalLabel">消息详情</h6>
            </div>
            <div class="modal-body" id="mess_con">
            
          		<p>对方账号：<span>jack</span></p>
          		<p>发生时间：<span>2016/03/12 12：30</span></p>
          		<p>时间类型：转账</p>
          		<p>金额：￥23.5</p>
          		<p>附加消息：小小心意，望收下。</p>
                <%-- <form id="change" class="form-inline">
                <div class="form-group">
                    <label>原始密码：</label><input type="password" class="form-control" id="oldpass">
                    <input id="username" type="hidden" value="${requestScope.user.username}">
                </div>
                    <div class="form-group">
                    <label>&nbsp新&nbsp密&nbsp码&nbsp：</label><input type="password" class="form-control" id="newpass">
                    
                </div>
                    <div class="form-group">
                        <label>确认密码：</label><input type="password" class="form-control" id="renewpass">
                    </div>
                </form> --%>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <!-- <button type="button" class="btn btn-primary" onclick="changep()">确认修改</button> -->
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
     <script src="js/lib/jquery-1.12.4.min.js"></script>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src="js/messages.js"></script>
</body>
</html>