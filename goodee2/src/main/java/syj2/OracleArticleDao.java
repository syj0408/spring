package syj2;

public class OracleArticleDao implements ArticleDao{

	@Override
	public String toString() {
		return "OracleArticleDao ";
	}

	public void insert(String string) {
		System.out.println(string);
	}

	public void update(String string) {
		System.out.println(string);
	}

	public void delete(String string) {
		System.out.println(string);
	}

}
