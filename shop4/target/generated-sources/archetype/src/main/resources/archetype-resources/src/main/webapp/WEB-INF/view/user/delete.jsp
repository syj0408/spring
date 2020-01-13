#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/jspHeader.jsp" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 탈퇴</title>
</head>
<body>
<table>
	<tr><td>아이디</td><td>${symbol_dollar}{user.userid}</td></tr>
	<tr><td>이름</td><td>${symbol_dollar}{user.username}</td></tr>
	<tr><td>생년월일</td><td><fmt:formatDate value="${symbol_dollar}{user.birthday}" pattern="yyyy-MM-dd"/></td></tr>
</table>
<br>
<form action="delete.shop" method="post" name="deleteform">
	<input type="hidden" name="userid" value="${symbol_dollar}{param.id}">비밀번호&nbsp;<input type="password" name="password" style="width:50%">
	<a href="javascript:deleteform.submit()" style="text-align: right;">[회원탈퇴]</a>
</form>
</body>
</html>