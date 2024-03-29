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
<title>게시물 상세보기</title>
</head>
<body>
<table>
	<tr><td colspan="2">Spring 게시판</td></tr>
	<tr><td width="15%">글쓴이</td>
		<td width="85%" class="leftcol">${symbol_dollar}{board.name}</td></tr>
	<tr><td>제목</td><td class="leftcol">${symbol_dollar}{board.subject}</td></tr>
	<tr><td>내용</td><td class="leftcol">
		<table>
			<tr><td class="leftcol">${symbol_dollar}{board.content}</td></tr>
		</table>
	</td></tr>
	<tr><td>첨부파일</td><td>&nbsp;
	<c:if test="${symbol_dollar}{!empty board.fileurl}">
	  <a href="file/${symbol_dollar}{board.fileurl}">${symbol_dollar}{board.fileurl}</a>
	</c:if></td></tr>  
	<tr><td colspan="2">
		<a href="reply.shop?num=${symbol_dollar}{board.num}">[답변]</a>
		<a href="update.shop?num=${symbol_dollar}{board.num}">[수정]</a>
		<a href="delete.shop?num=${symbol_dollar}{board.num}">[삭제]</a>
		<a href="list.shop">[게시물 목록]</a>
	</td></tr>			
</table>
</body>
</html>