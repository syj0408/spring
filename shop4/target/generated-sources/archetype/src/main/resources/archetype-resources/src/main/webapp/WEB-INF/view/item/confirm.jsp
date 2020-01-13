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
<title>상품 삭제 전 확인</title>
</head>
<body>
<h2>상품 삭제 전 확인</h2>
<table>
<tr><td><img src="img/${symbol_dollar}{item.pictureUrl}"></td>
	<td><table>
		   <tr><td>상품명</td><td>${symbol_dollar}{item.name}</td></tr>
		   <tr><td>가격</td><td>${symbol_dollar}{item.price}</td></tr>
		   <tr><td>상품설명</td><td>${symbol_dollar}{item.description}</td></tr>
	       <tr><td colspan="2"><input type="button" value="상품삭제" onclick="location.href='delete.shop?id=${symbol_dollar}{item.id}'">
	       					   <input type="button" value="상품목록" onclick="location.href='list.shop'"></td></tr>
	   	</table></td>	
</table>
</body>
</html>