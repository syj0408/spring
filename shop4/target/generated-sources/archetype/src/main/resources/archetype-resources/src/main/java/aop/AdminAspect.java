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
public class AdminAspect {
	@Around("execution(* controller.Admin*.*(..))")
	/*@Around("execution(* controller.Admin*.*(..)) && args(..,session)")
		public Object adminCheck(ProceedingJoinPoint joinPoint,HttpSession session) throws Throwable{
		User loginUser = (User)session.getAttribute("loginUser");
		if(loginUser ==null) {
			throw new LoginException("로그인 후  가능합니다.","../user/login.shop");
		}
		if(!loginUser.getUserid().equals("admin")) {
			throw new LoginException("관리자만 가능한 거래입니다.", "../user/main.shop");
		}
		Object ret = joinPoint.proceed();
		return ret;
		}*/
	public Object adminCheck(ProceedingJoinPoint joinPoint) throws Throwable{
		User loginUser = null;  //session 없으면
		for(Object o : joinPoint.getArgs()) { //여기 진행 안됨
			if(o instanceof HttpSession) {
				HttpSession session = (HttpSession)o;
				loginUser = (User)session.getAttribute("loginUser");
			}
		}
		if(loginUser == null) {
			throw new LoginException("로그인 후  가능합니다.","../user/login.shop");
		}
		if(!loginUser.getUserid().equals("admin")) {
			throw new LoginException("관리자만 가능한 페이지입니다.", "../user/main.shop?id="+loginUser.getUserid());
		}
		Object ret = joinPoint.proceed();
		return ret;
	}
}

