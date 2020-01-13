#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script>
	window.parent.CKEDITOR.tools.callFunction
		(${symbol_dollar}{CKEditorFuncNum},'${symbol_dollar}{fileName}','이미지 업로드 완료')
</script>