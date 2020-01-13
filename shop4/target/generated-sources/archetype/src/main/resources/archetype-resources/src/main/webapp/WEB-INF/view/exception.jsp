#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true"%> 
<!-- isErrorPage="true" exception객체를 전달받기위해서.<=loginexception을 전달-->
<script>
	alert("${symbol_dollar}{exception.message}");
	location.href="${symbol_dollar}{exception.url}";
</script>