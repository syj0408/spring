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
<title>상품 등록 화면</title>
</head>
<body>
<form:form modelAttribute="item" action="register.shop" enctype="multipart/form-data">  <!-- enctype="multipart/form-data" 파일에있는 내용까지 서버로 전달 -->
<h2>상품 등록</h2>
	<table><tr><td>상품명</td>
		<td><form:input path="name" maxlength="20" /></td>
		<td><font color="red"><form:errors path="name" /></font></td></tr>
	<tr><td>상품가격</td>
		<td><form:input path="price" maxlength="20" /></td>
		<td><font color="red"><form:errors path="price" /></font></td>
	</tr>
	<tr><td>상품 이미지</td>
		<td colspan="2"><input type="file" name="picture"></td> <!-- item.java에  private MultipartFile picture; 와 이름이 같아야함-->
	</tr>
	<tr><td>상품설명</td>
		<td><form:textarea path="description" cols="20" rows="5" /></td>
		<td><font color="red"><form:errors path="description" /></font></td>
	</tr>
	<tr>
		<td colspan="3"><input type="submit" value="상품등록">&nbsp;<input type="button" value="상품목록" onclick="location.href='list.shop'"></td>
	</tr>
	</table>
</form:form>
</body>
</html>