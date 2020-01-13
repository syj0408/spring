package annotation;

import org.springframework.stereotype.Component;

import xml.Article;
import xml.ReadArticleService;

@Component("readArticleService") 
//생성되는 객체의 이름을 readArticleService로 설정("readArticleService") 작성 x때,  readArticleServiceImpl이 됨.
public class ReadArticleServiceImpl implements ReadArticleService{
	public Article getArticleAndReadCnt(int id) throws Exception {
		if(id ==0) {
			throw new Exception("id는 0이 안됨");
		}
		return new Article(id);
	}
}
