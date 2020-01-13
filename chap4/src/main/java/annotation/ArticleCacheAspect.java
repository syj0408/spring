package annotation;

import java.util.HashMap;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import xml.Article;

@Component
@Aspect
@Order(2)
public class ArticleCacheAspect {
	private Map<Integer,Article> cache = new HashMap<Integer,Article>();
	@Around("execution(public * *..ReadArticleService.*(..))") //관련된 모두가져옴
	public Object cache(ProceedingJoinPoint joinPoint) throws Throwable{
		Integer id = (Integer)joinPoint.getArgs()[0]; //호출되는 핵심로직의 매개변수 목록을 가져옴
		//joinPoint.getSignature().getName() : 핵심로직 메서드 이름
		System.out.println("[ACA] " +joinPoint.getSignature().getName()+"("+id+") 메서드 호출 전");
		Article article = cache.get(id);
		if(article != null) {
			System.out.println("[ACA] cache에서 Article[" + id + "] 가져옴");
			return article; //article이 있으면 실행
		}
		Object ret = joinPoint.proceed(); //article이 0 이면 다음으로 이동시킴,있으면 여기 실행 X
		System.out.println("[ACA] " + joinPoint.getSignature().getName() + "(" + id + ") 메서드 호출 후");
		if(ret != null && ret instanceof Article) {
			cache.put(id, (Article)ret);
			System.out.println("[ACA] cache에 Article [" + id + "] 추가함");
		}
		return ret; //main으로 전달
	}
}
