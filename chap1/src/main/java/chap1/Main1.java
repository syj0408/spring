package chap1;

import org.springframework.context.support.GenericXmlApplicationContext;

public class Main1 {
	public static void main(String[] args) {
		 //GenericXmlApplicationContext=컨테이너 객체들을 많ㅇ ㅣ가지고있음..	
		 //property=이름 format인 메서드에 value값을 넣음. ==>DI (의존성)
		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationContext.xml");
		Greeter g = ctx.getBean("greeter",Greeter.class); //ctx로부터 Greeter인 객체를 가져온다. g라는 참조변수로 참조함.
		System.out.println(g.greet("스프링")); //g라는 객체에 greet메서드를 호출
		
		Message m = ctx.getBean("message",Message.class); //Message 객체이름
		m.syaHello("hongkildong");
		
		Greeter g2 = ctx.getBean("greeter",Greeter.class);
		if(g == g2) {
			System.out.println("g 객체와 g2객체는 같은 객체다.");
		}
	}
}
