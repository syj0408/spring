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
<title>상품 수정</title>
</head>
<body>
<form:form modelAttribute="item" action="update.shop" enctype="multipart/form-data"> <!-- 메소드방식 post를 지정하지 않음. enctype="multipart/form-data"를 기입하면 내부적으로 알아서 post타입으로 지정함. -->
<form:hidden path="id"/>
<form:hidden path="pictureUrl"/>
<h2>상품 정보 수정</h2>
	<table>
	<tr><td>상품명</td>
		<td><form:input path="name" maxlength="20" /></td>
		<td><font color="red"><form:errors path="name"/></font></td></tr>
	<tr><td>상품 가격</td>
		<td><form:input path="price" maxlength="20" /></td>
		<td><font color="red"><form:errors path="price"/></font></td></tr>
	<tr><td>상품 이미지</td>
		<td><input type="file" name="picture"/></td>
		<td>${symbol_dollar}{item.pictureUrl}</td></tr>
	<tr><td>상품설명</td>
		<td><form:textarea path="description" cols="20" rows="5" /></td>
		<td><font color="red"><form:errors path="description"/></font></td></tr>
	<tr><td colspan="3"><input type="submit" value="수정등록">&nbsp;<input type="button" value="상품 목록" onclick="location.href='list.shop'"></td></tr>
	</table>
</form:form>
</body>
</html>