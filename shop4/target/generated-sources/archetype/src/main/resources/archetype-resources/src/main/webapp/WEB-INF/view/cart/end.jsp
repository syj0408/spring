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
<title>주문 확정 상품</title>
</head>
<body>
<!-- ${symbol_dollar}{sale.user.username}도 같음 -->
<h2>${symbol_dollar}{loginUser.username}님이 주문하신 정보 입니다.</h2>
<h2>배송지 정보</h2>
<table>
	<tr>
		<td width="30%">주문 아이디</td>
		<td width="70%">${symbol_dollar}{sessionScope.loginUser.userid}</td>
	</tr>
	<tr>
		<td width="30%">이름</td>
		<td width="70%">${symbol_dollar}{sessionScope.loginUser.username}</td>
	</tr>
	<tr>
		<td width="30%">우편번호</td>
		<td width="70%">${symbol_dollar}{sessionScope.loginUser.postcode}</td>
	</tr>
	<tr>
		<td width="30%">주소</td>
		<td width="70%">${symbol_dollar}{sessionScope.loginUser.address}</td>
	</tr>
	<tr>
		<td width="30%">전화번호</td>
		<td width="70%">${symbol_dollar}{sessionScope.loginUser.phoneno}</td>
	</tr>
</table>
<h2>주문 완료 상품</h2>
<table>
	<tr><th>상품명</th><th>가격</th><th>수량</th><th>합계</th></tr>
	<c:forEach items="${symbol_dollar}{sale.itemList}" var="saleitem">
		<tr><td>${symbol_dollar}{saleitem.item.name}</td><td>${symbol_dollar}{saleitem.item.price}</td>
			<td>${symbol_dollar}{saleitem.quantity}</td><td>${symbol_dollar}{saleitem.item.price*saleitem.quantity}</td>
		</tr>
	</c:forEach>
	<tr><td colspan="4" align="right">총 구입 금액: <fmt:formatNumber value="${symbol_dollar}{total}" pattern="${symbol_pound}${symbol_pound}${symbol_pound},${symbol_pound}${symbol_pound}${symbol_pound}"/>원</td></tr>
	<tr><td colspan="4"> <a href="../item/list.shop">상품목록</a>&nbsp;</td></tr>
</table>
</body>
</html>