package main;
//annotation.xml 대신으로 이 형태의.. java로 사용?
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration //설정 java소스. xml 설정 대체 하는 소스
@ComponentScan(basePackages = {"annotation","main"}) //annotation패키지를 훑어서 내용을 찾아 @component를 찾으면 객체화시켜줌, annotation.xml에서 -> component-scan이부분에 해당
@EnableAspectJAutoProxy //AOP설정 ,annotation.xml에서  ->aspectj-autoproxy
public class AppCtx {
	/*@Bean  //<bean id="memberService2" class="main.MemberService (리턴값)" />
	public MemberService memberService2() {
		return new MemberService();
	}*/
}
