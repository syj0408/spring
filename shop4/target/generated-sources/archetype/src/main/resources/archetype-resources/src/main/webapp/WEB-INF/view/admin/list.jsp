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
<title>회원 목록</title>
<script type="text/javascript">
	function allchkbox(allchk){
		//getElementsByName : name 속성이 idchks 태그 목록. chks->배열로 전달
		//var chks =document.getElementsByName("idchks");
		//for(var i=0; i<chks.length; i++){
		//	chks[i].checked = allchk.checked;
		//}
		//jquery방식으로
		${symbol_dollar}("input[name=idchks]").prop("checked",allchk.checked)
		// class속성이 idchks 일때  ${symbol_dollar}(".idchks").attr("checked",allchk.checked)로 사용.
	}
</script>
</head>
<body>
<form action="mailForm.shop" method="post">
  <table>
	<tr><td colspan="7" style="font-size: 20px;font-style: oblique;">회원목록</td></tr>
	<tr><th>아이디</th><th>이름</th><th>전화</th><th>생일</th><th>이메일</th><th>&nbsp;</th>
		<th><input type="checkbox" name="allchk" onchange="allchkbox(this)"></th></tr>
		<c:forEach items="${symbol_dollar}{list}" var="user">
			<tr><td>${symbol_dollar}{user.userid}</td><td>${symbol_dollar}{user.username}</td><td>${symbol_dollar}{user.phoneno}</td>
				<td><fmt:formatDate value="${symbol_dollar}{user.birthday}" pattern="yyyy-MM-dd" /></td><td>${symbol_dollar}{user.email}</td>
				<td><a href="../user/update.shop?id=${symbol_dollar}{user.userid}">수정</a>&nbsp;
					<a href="../user/delete.shop?id=${symbol_dollar}{user.userid}">강제탈퇴</a>&nbsp;
					<a href="../user/mypage.shop?id=${symbol_dollar}{user.userid}">회원정보</a></td>
				<td><input type="checkbox" name="idchks" value="${symbol_dollar}{user.userid}"></td>
			</tr>
		</c:forEach>	
		<tr><td colspan="7"><input type="submit" value="메일보내기"	></td></tr>		
  </table>
</form>
</body>
</html>