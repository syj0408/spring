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
<title>websocket client</title>
<c:set var="port" value="${symbol_dollar}{pageContext.request.localPort}"/>   <!--  8080 -->
<c:set var="server" value="${symbol_dollar}{pageContext.request.serverName}"/> <!--  ip -->
<c:set var="path" value="${symbol_dollar}{pageContext.request.contextPath}"/> <!-- 프로젝트 이름 -->
<script type="text/javascript">
	${symbol_dollar}(function(){   //문서가 준비 완료
		var ws = new WebSocket("ws://${symbol_dollar}{server}:${symbol_dollar}{port}${symbol_dollar}{path}/chatting.shop");  //객체를 만드는부분, 웹소켓을 열어줌
		ws.onopen = function(){  //서버와 접속이 연결될때 호출되는 이벤트.
			${symbol_dollar}("${symbol_pound}chatStatus").text("info:connection opened")
			//chatInput 태그에 key이벤트 등록. 
			${symbol_dollar}("input[name=chatInput]").on("keydown",function(evt){  //keydown 키가 눌려질때 이벤트 등록
				//evt : keyevent 객체
				if(evt.keyCode == 13){   //enter key키의 아스키 코드값.
					var msg = ${symbol_dollar}("input[name=chatInput]").val();
					ws.send(msg); //서버로  입력된 메세지를 전송.
					${symbol_dollar}("input[name=chatInput]").val(""); //enter키 후 입력된 내용 지움.
				}
			})
		}
		//서버에서  메세지를  수신한 경우.
		ws.onmessage = function(event){
			//prepend(): 앞족에 메세지 출력
			${symbol_dollar}("textarea").eq(0).prepend(event.data+"${symbol_escape}n");
		}
		//서버 연결이 해제된 경우.
		ws.onclose = function(event){	
			${symbol_dollar}("${symbol_pound}chatStatus").text("info.connection close");
		}
	})
</script>
</head>
<body>
<p>
<div id="chatStatus"></div>
<textarea name="chatMsg" rows="15" cols="40"></textarea><br>
메세지 입력: <input type="text" name="chatInput">
</body>
</html>