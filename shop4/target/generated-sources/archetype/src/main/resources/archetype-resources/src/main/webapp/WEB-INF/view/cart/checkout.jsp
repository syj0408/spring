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
<title>주문 전 상품 목록 보기</title>
</head>
<body>
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
<h2>구매 상품</h2>
<table>
	<tr><th>상품명</th><th>가격</th><th>수량</th><th>합계</th></tr>
	<c:forEach items="${symbol_dollar}{sessionScope.CART.itemSetList}" var="itemSet" varStatus="stat">
		<tr><td>${symbol_dollar}{itemSet.item.name}</td><td>${symbol_dollar}{itemSet.item.price}</td>
			<td>${symbol_dollar}{itemSet.quantity}</td><td>${symbol_dollar}{itemSet.item.price*itemSet.quantity}</td>
		</tr>
	</c:forEach>
	<tr><td colspan="4" align="right">총 구입 금액: ${symbol_dollar}{sessionScope.CART.total}원</td></tr>
	<tr><td colspan="4"> 
		<a href="end.shop">주문 확정</a>&nbsp;
		<a href="../item/list.shop">상품목록</a>&nbsp;
		</td>
	</tr>
</table>
</body>
</html>