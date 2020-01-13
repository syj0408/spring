package chap1;

public class MessageKo implements Message{
	@Override
	public void syaHello(String msg) {
		System.out.println("반갑습니다." + msg + "입니다.");
	}
}
