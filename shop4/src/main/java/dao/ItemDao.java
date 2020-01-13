package dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dao.mapper.ItemMapper;
import logic.Item;

//MyBatis형태
@Repository  //@Component +  dao 기능
public class ItemDao {
	@Autowired   //현재 내 컨테이너들 중에 sqlSession 템플릿 객체를 주입.
	private SqlSessionTemplate sqlSession; // spring-db.xml에있는 sqlSessionTemplate 가 주입됨.
	private Map<String,Object> param = new HashMap<>();
	public List<Item> list() {
		return sqlSession.getMapper(ItemMapper.class).select(null);
	}

	public void insert(Item item) {
		param.clear();
		int id = sqlSession.getMapper(ItemMapper.class).maxid();
		item.setId(++id+""); //String 타입으로 형변환
		sqlSession.getMapper(ItemMapper.class).insert(item);
	}

	public Item selectOne(String id) {
		param.clear();
		param.put("id",id);
		return sqlSession.getMapper(ItemMapper.class).select(param).get(0);   //레코드 1건이라 get(0)
	}

	public void update(Item item) {
		sqlSession.getMapper(ItemMapper.class).update(item);
		
	}

	public void delete(String id) {
		param.clear();
		param.put("id",id);
		sqlSession.getMapper(ItemMapper.class).delete(param);
	}
}
