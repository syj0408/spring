package chap2;

import java.util.Arrays;

import org.springframework.context.support.GenericXmlApplicationContext;


public class Main1 {
	public static void main(String[] args) {
		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationContext.xml");
		Project pro = ctx.getBean("project", Project.class);
		pro.build();
		
		pro=new Project(); //null  ,객체만 생성됨.주입X

		BuildRunner br = ctx.getBean("runner",BuildRunner.class); //xml에서 주입됨 16번째줄
		br.build(Arrays.asList("src/","srcResource/"), "/bin1");
		
		br = new BuildRunner();
		br.build(Arrays.asList("src/","srcResource/"), "/bin2");
		
		WriteImpl wi = ctx.getBean("write",WriteImpl.class);
		wi.write();
	}
}
