package spring;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StopWatch;

public class LoggingAspect {
	public Object logging(ProceedingJoinPoint joinPoint) throws Throwable{ //logging 이 write메서드에 의해서 먼저 실행됨.
		System.out.println("[LA]로그 시작");
		StopWatch sw = new StopWatch();
		sw.start();
		Object ret = joinPoint.proceed(); //다음메서드로 보냄  -> wirte메서드 실행 리턴값이있으면 ret로 보내줌  없으면 null값 나옴 
		sw.stop();
		System.out.println("[LA] 메서드 실행시간 : " + sw.getTotalTimeMillis()+"밀리초");
		return ret;
	}
}
