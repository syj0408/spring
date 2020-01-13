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
<title>상품 목록</title>
</head>
<body>
<a href="create.shop">상품 등록</a>
<a href="../cart/cartView.shop" style="float:right;">장바구니</a>
<table border="1" style="border-collapse:collapse;">
<tr><th width="80">상품ID</th><th width="320">상품명</th>
	<th width="100">가격</th><th width="80">수정</th>
	<th width="80">삭제</th></tr>
	<c:forEach items="${symbol_dollar}{itemList}" var="item">
	<tr><td align="center">${symbol_dollar}{item.id}</td>
	<td align="left"><a href="detail.shop?id=${symbol_dollar}{item.id}">${symbol_dollar}{item.name}</a></td>
	<td align="right"><fmt:formatNumber value="${symbol_dollar}{item.price}" type="CURRENCY" currencySymbol=""/>원</td>
	<td align="center"><a href="edit.shop?id=${symbol_dollar}{item.id}" >수정</a></td>
	<td align="center"><a href="confirm.shop?id=${symbol_dollar}{item.id}">삭제</a></td>
	</tr></c:forEach></table>
</body>
</html>