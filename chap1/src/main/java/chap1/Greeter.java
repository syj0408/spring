package chap1;

public class Greeter {
	private String format; //멤버변수
	
	public String greet(String guest) {  //멤버메서드1
		return String.format(format, guest); //guest에는 "스프링"값
	}
	
	public void setFormat(String format) { //멤버메서드2  여기 'format = %s를 시작합니다.'를 갖게됨.
		this.format = format;
	}
}
