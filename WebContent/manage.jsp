<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="keywords" content="jquery,ui,easy,easyui,web">
	<meta name="description" content="easyui help you build your web page easily!">
	<title>银行账目——后台管理</title>
	<link rel="stylesheet" type="text/css" href="js/lib/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="js/lib/easyui/themes/icon.css">
	<script type="text/javascript" src="js/lib/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="js/lib/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/manage.js"></script>
</head>
<body>
<div class="demo-info">
		<div class="demo-tip icon-tip">&nbsp;</div>
		
		<c:if test="${sessionScope.realName!=null}">
		<div style="float:right; margin-right:80px">
		<span hideDelay=1000 title="<a href='changePassword.jsp?name=${sessionScope.username}'>&nbsp更改密码</a><br>上次登录时间：${sessionScope.lastLogTime}" class="easyui-tooltip">
		${sessionScope.realName}</span> <a href="logout.do">注销</a></div></c:if>
		
		<div style="color:#a7912a">银行管理系统.</div>
	</div>
	<div class="easyui-tabs" style="width:1000px;height:570px;">
	<table id="tt">
	</table>
	</div>

</body>
</html>