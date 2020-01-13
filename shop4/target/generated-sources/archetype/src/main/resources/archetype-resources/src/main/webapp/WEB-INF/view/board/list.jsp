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
<title>게시판 목록</title>
<script type="text/javascript"><!-- 조건검색시 pageNum유지 -->
	function listdo(page){
		document.searchform.pageNum.value=page;
		document.searchform.submit();
	}
</script> 
</head>
<body>
<table>
	<tr><td colspan="5"><div style="display:inline">
	<form action="list.shop" method="post" name="searchform">
		<input type="hidden" name="pageNum" value="1">
		<select name="searchtype" style="width:100px;">
		<option value="">선택하세요</option>
		<option value="subject">제목</option>
		<option value="name">작성자</option>
		<option value="content">내용</option>
		</select>
		<script>document.searchform.searchtype.value="${symbol_dollar}{param.searchtype}";</script> <!-- 조건 검색 고정 -->
		<input type="text" name="serchcontent" value="${symbol_dollar}{param.serchcontent}" style="width:250px;">
		<input type="submit" value="검색">
		
	</form>
	</div></td></tr>
	<c:if test="${symbol_dollar}{listcount >0}"> <!-- 등록된 게시물이 있음 -->
	<tr><td colspan="4" style="font-size:26px;">Spring 게시판</td><td>글 개수:${symbol_dollar}{listcount}</td></tr>
	<tr><th>번호</th><th>제목</th><th>글쓴이</th><th>날짜</th><th>조회수</th></tr>
	<c:forEach  var="board" items="${symbol_dollar}{boardlist}"> <!-- 화면에 보여지는ㄱ ㅔ시물들 -->
		<tr><td>${symbol_dollar}{boardno}</td>
			<c:set var="boardno" value="${symbol_dollar}{boardno -1}" />
			<td style="text-align:left;">
			<c:if test="${symbol_dollar}{! empty board.fileurl}">
				<a href="file/${symbol_dollar}{board.fileurl}">@</a></c:if>
			<c:if test="${symbol_dollar}{empty board.fileurl}">&nbsp;&nbsp;&nbsp;</c:if>
<!-- 답변글인 경우 들여쓰기를 해주기 위한 부분 -->
	<c:forEach begin="1" end="${symbol_dollar}{board.grplevel}">&nbsp;&nbsp;</c:forEach>
		<c:if test="${symbol_dollar}{board.grplevel > 0}">└</c:if>
		<a href="detail.shop?num=${symbol_dollar}{board.num}">${symbol_dollar}{board.subject}</a></td>
			<td>${symbol_dollar}{board.name}</td><td>${symbol_dollar}{board.regdate}</td><td>${symbol_dollar}{board.readcnt}</td></tr>
	</c:forEach>
<!-- 페이지 부분 출력 -->	
	<tr><td colspan="5">
		<c:if test="${symbol_dollar}{pageNum > 1 }">
		<%-- 	<a href="list.shop?pageNum=${symbol_dollar}{pageNum -1}">[이전]</a> --%>
 			<a href="javascript:listdo(${symbol_dollar}{pageNum - 1})">[이전]</a>  <!-- 조건 검색 시 페이지 유지 --> 
		</c:if>
		<c:if test="${symbol_dollar}{pageNum <= 1 }">[이전]</c:if>
		<c:forEach var="a" begin="${symbol_dollar}{startpage }" end="${symbol_dollar}{endpage }"> <!-- start페이지부터 end페이지까지 출력해주는 부분 -->
			<c:if test="${symbol_dollar}{a == pageNum}">[${symbol_dollar}{a}]</c:if>	<!-- 현재페이지는 하이퍼링크를 걸지 않음 -->
			<c:if test="${symbol_dollar}{a != pageNum}">
<%-- 				<a href="list.shop?pageNum=${symbol_dollar}{a}">[${symbol_dollar}{a}]</a> --%>
	 			<a href="javascript:listdo(${symbol_dollar}{a})">[${symbol_dollar}{a}]</a> <!-- 조건 검색 시 페이지 유지 --> 
			</c:if>
		</c:forEach>
		<!-- 다음페이지 존재 link 연결-->
		<c:if test="${symbol_dollar}{pageNum < maxpage}">
		<%-- <a href="list.shop?pageNum=${symbol_dollar}{pageNum + 1}">[다음]</a>  --%>
			<a href="javascript:listdo(${symbol_dollar}{pageNum + 1})">[다음]</a> <!-- 조건 검색 시 페이지 유지 -->
		</c:if>
		<!-- 다음페이지 없음 -->
		<c:if test="${symbol_dollar}{pageNum >= maxpage}">[다음]</c:if>	 
		</td></tr>
		</c:if>
		<c:if test="${symbol_dollar}{listcount == 0 }">
			<tr><td colspan="5"> 등록된 게시물이 없습니다. </td></tr>
		</c:if>
		<tr><td colspan="5" align="right"><a href="write.shop">[글쓰기]</a></td></tr>
</table>
</body>
</html>