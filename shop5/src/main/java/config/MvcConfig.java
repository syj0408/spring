package config;

import java.util.Properties;



import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration	//스프링 환경설정 클래스. xml 대체하는 클래스
@ComponentScan(basePackages= {"controller","logic","dao","aop","websocket"})  //@ComponentScan xml어노테이션 => annotation의 설정과 같음. pakages에있는 이름을가진 부분을 객체화
@EnableAspectJAutoProxy //AOP설정
@EnableWebMvc //유효성검증
public class MvcConfig implements WebMvcConfigurer{
	// @Bean : <bean id="handlerMapping" class="..HandlerMapping" />
	//  => HandlerMapping 클래스의 객체를 handlerMapping 이름으로 컨테이너 저장
	@Bean //요청정보와 Controller를 mapping  =ex>@RequestMapping("admin")
	public HandlerMapping handlerMapping() {
		RequestMappingHandlerMapping hm = new RequestMappingHandlerMapping();
		hm.setOrder(0); //순서.
		return hm;
	}
	@Bean //view의 위치 지정
	public ViewResolver viewResolver() {
		InternalResourceViewResolver vr = new InternalResourceViewResolver();
		vr.setPrefix("/WEB-INF/view/");
		vr.setSuffix(".jsp");
		return vr;
	}
	@Bean
	public MessageSource messageSource() {
		ResourceBundleMessageSource ms = new ResourceBundleMessageSource();
		ms.setBasename("messages");
		return ms;
	}
	@Bean	//파일 객체 설정
	public MultipartResolver multipartResolver() {
		CommonsMultipartResolver mr = new CommonsMultipartResolver();
		mr.setMaxInMemorySize(10485760);
		mr.setMaxUploadSize(104857600);
		return mr;
	}
	@Bean  //예외처리 객체
	public SimpleMappingExceptionResolver exceptionHandler() {
		SimpleMappingExceptionResolver ser = new SimpleMappingExceptionResolver();
		Properties pr = new Properties();
		pr.put("exception.CartEmptyException","exception");  //예외처리의  exception.jsp객체에 접근.
		pr.put("exception.LoginException","exception");
		pr.put("exception.BoardException","exception");
		ser.setExceptionMappings(pr);
		return ser;
	}
}
