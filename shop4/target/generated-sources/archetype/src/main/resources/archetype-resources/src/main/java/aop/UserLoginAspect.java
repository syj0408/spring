#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package aop;

import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import exception.LoginException;
import logic.User;

@Component
@Aspect
@Order(1)
public class UserLoginAspect {
	@Around    //advice : 핵심 로직에서 중간에 끼어들어가는 부분을 잡아냄, 핵심로직 전  , 후
	("execution(* controller.User*.check*(..)) && args(..,session)") //중요한 부분. pointcut: 핵심로직 설정  , User로 시작하는 클래스 전부,check로 시작하는 메서드 전부 ,session이있는것만 대상으로 삼겠다
	public Object userLoginCheck (ProceedingJoinPoint joinPoint, HttpSession session) throws Throwable{
		User loginUser = (User)session.getAttribute("loginUser");
		if(loginUser == null) { //로그아웃 상태
			throw new LoginException("1.로그인 후 거래하세요.","login.shop");
		}
		Object ret = joinPoint.proceed();
		return ret;
	}
	@Around 
	("execution(* controller.User*.check*(..)) && args(id,session)")
	public Object userIdCheck (ProceedingJoinPoint joinPoint,String id, HttpSession session) throws Throwable{
		User loginUser = (User)session.getAttribute("loginUser");
		if(loginUser == null) { //로그아웃 상태
			throw new LoginException("2.로그인 후 거래하세요.","login.shop");
		}
		if(!loginUser.getUserid().equals("admin") && !loginUser.getUserid().equals(id)) {
			throw new LoginException("본인 정보만 조회 가능합니다.","main.shop");
		}
		Object ret = joinPoint.proceed();
		return ret;
	}
}
