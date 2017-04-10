<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="js/lib/bootstrap.min.css">
    <title>个人中心--新司机银行</title>
    <style rel="stylesheet">
        #myinfo{
            width: 500px;
            margin:20px auto;
            height: 300px;
            border: solid 1px;
            background-color: rgba(155, 157, 184, 0.38);
        }
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
        #btn-g{
            margin-top: 8px;
            margin-left: 16%;
        }
        #info-content{
            width: 80%;
            margin: 7% auto;
            margin-left: 19%;
        }
        #info-content p span{
            text-decoration: underline;
            color: black;
        }

        #change{
            width: 80%;
            margin: 3px auto;
        }
        #isExist{
        color:red;
        visibility:hidden;
        }
    </style>
    <script src="js/lib/jquery-1.12.4.min.js"></script>
    <script src="js/lib/bootstrap.min.js"></script>
    <script src="js/usercenter.js"></script>

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
    <p> 我的个人中心</p>
</div>
<div id="myinfo">
    <div id="btn-g">
        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#transfer">转账</button>
        <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal">修改密码</button>
        <button type="button" id="checkmess" class="btn btn-info btn-sm" onclick="location.href='messages.jsp'">查看消息<span></span></button>
        <%-- <c:if test="${requestScope.user.usertype=='管理员'}"> --%>
    		<a href="manage.jsp" id="manage" type="button" style="display:none" class="btn btn-primary btn-sm">管理员</a>
    	<%-- </c:if> --%>
        
    </div>
    <hr>
    <div id="info-content">
       <%-- <p> 账&nbsp&nbsp&nbsp号&nbsp&nbsp&nbsp：<span>${requestScope.user.eid}</span><br></p>
        <p>用&nbsp户&nbsp名&nbsp：<span>${requestScope.user.username}</span><br></p>
        <p>账户类型：<span>${requestScope.user.usertype}</span><br></p>
        <p>余&nbsp&nbsp&nbsp额&nbsp&nbsp&nbsp：<span>￥${requestScope.user.balance}</span></p> --%>
    </div>

</div>





<!-- 修改密码模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog "style="height: 300px;width: 400px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h6 class="modal-title" id="myModalLabel">修改密码</h6>
            </div>
            <div class="modal-body">
                <form id="change" class="form-inline">
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
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="changep()">确认修改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!-- 转账模态框（Modal） -->
<div class="modal fade" id="transfer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog "style="height: 300px;width: 400px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h6 class="modal-title" id="transfer">转账</h6>
            </div>
            <div class="modal-body">
                <form id="trans" class="form-inline">
                    <div class="form-group">
                        <label>对方账号：</label><input type="text" class="form-control" onblur="tranBlur()" onfocus="tranFocus()" id="toUsername">
                        <span id="isExist" >该账号不存在</span>
                    </div>
                    <div class="form-group">
                        <label>转账金额：</label><input type="number" class="form-control" id="sum">
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="transfer()">确认转账</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<script>

</script>

</body>
</html>