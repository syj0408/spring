package main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import xml.Article;
import xml.Member;
import xml.MemberService;
import xml.ReadArticleService;
import xml.UpdateInfo;

public class Main2 {
	public static void main(String[] args) {
		String[] config = {"di.xml" , "aop2.xml"};
		ApplicationContext ctx = new ClassPathXmlApplicationContext(config);
		//service : di.xml에있는 bean에 class이름인 -> xml.ReadArticleServiceImpl 객체저장
		ReadArticleService service = ctx.getBean("readArticleService",ReadArticleService.class);
		try {
			Article a1 = service.getArticleAndReadCnt(1);
			System.out.println("a1:" +a1);
			Article a2 = service.getArticleAndReadCnt(1);
			System.out.println("[main] a1==a2 : " + (a1==a2));
			service.getArticleAndReadCnt(0);
		}catch(Exception e) {
			System.out.println("[main]" + e.getMessage());
		}
		System.out.println("\n UpdateMemberInfoTrace Aspect 연습");
		MemberService msvc = ctx.getBean("memberService",MemberService.class);
		msvc.regist(new Member()); 
		msvc.update("hong", new UpdateInfo());
		msvc.delete("hong2", "test");
		System.out.println("\n main.MemberService 메서드 호출");
		//main.MemberService msvc2 = new main.MemberService();  //traceAdvice가 걸리지 않음 컨테이너에 설정 되어있지않아서 메서드출력이안됨 
		main.MemberService msvc2 = ctx.getBean("memberService2",main.MemberService.class);
		msvc2.regist(new Member()); //
		msvc2.update("hong", new UpdateInfo());
		msvc2.delete("hong2", "test");
	}
}
