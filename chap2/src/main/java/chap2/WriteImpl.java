package chap2;

public class WriteImpl {
	private ArticleDao dao;
	// 1.클래스와 생성자 이름이 같아야한다. 2. 매개변수지정,기본생성자는 매개변수가없다.
	public WriteImpl(ArticleDao dao) { //생성자
		this.dao = dao;
	}
	public void write() {
		System.out.println("WriteImpl.wirte 메서드 호출");
		dao.insert();
	}
}