#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package websocket;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class EchoHandler extends TextWebSocketHandler{
	//clients : 접속된 클라이언트 목록
	private Set<WebSocketSession> clients = new HashSet<WebSocketSession>(); //Set 중복된것은 등록하지 않음 . 똑같은 세션이들어오면 추가되지않는다.
	
	@Override   //브라우저가 연결될 경우
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		super.afterConnectionEstablished(session);
		System.out.println("클라이언트 접속" +session.getId()); //접속한 세션아이디를 확인가능
		clients.add(session);  //Set clients에 세션값 저장
	}
	@Override
	//클라이언트로부터 메세지를 서버로 수신   , session => 클라이언트에 할당된 세션 , message => 클라이언트가 전송한 메세지.
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception{   
		String loadMessage = (String)message.getPayload();   //loadMessage => 클라이언트가 전송한 메세지.
		System.out.println("클라이언트 메세지:" +loadMessage);
		clients.add(session);  //왜추가? 혹시라도  다시 연결하기위해서. 중복된경우는 add 불가. 원래는 기재하면 안해도됨.
		//접속된 클라이언트들에게 수신된 메세지 전송.
		for(WebSocketSession s : clients) {
			s.sendMessage(new TextMessage(loadMessage));  //chat.jsp에서 ws.onmessage = function(event){ 될때 ,loadMessage를  TextMessage형태로 바꿔서  클라이언트들이게 모든 메세지를 전송함.
		}
	}
	@Override 
	//에러발생시. EX)세션끊어졌을때? 
	public void handleTransportError(WebSocketSession session , Throwable exception) throws Exception{
		super.handleTransportError(session, exception);
		System.out.println("오류발생:" + exception.getMessage());
	}
	@Override
	//클라이언트 접속(연결)종료 
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
		super.afterConnectionClosed(session, status);
		System.out.println("클라이언트 접속 해제"+ status.getReason());
		clients.remove(session);
	}
}
