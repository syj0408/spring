<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true"%> 
<!-- isErrorPage="true" exception객체를 전달받기위해서.<=loginexception을 전달-->
<script>
	alert("${exception.message}");
	location.href="${exception.url}";
</script>