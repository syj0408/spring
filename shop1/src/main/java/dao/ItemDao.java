package dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource; //Connection 객체로봐도 무방

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import logic.Item;

public class ItemDao {
	private NamedParameterJdbcTemplate template; //spring jdbc 프레임 워크
	RowMapper<Item> mapper = new BeanPropertyRowMapper<Item>(Item.class);
	//Connection 객체 주입 => xml 설정
	//dataSource : DriverManagerDataSource 객체 주입 (Connection 객체..?)
	public void setDataSource(DataSource dataSource) {
		this.template = new NamedParameterJdbcTemplate(dataSource);
	}
	public List<Item> list() {
		/* db로부터 item에있는 모든 컬럼과 값들을 실어서 list형태로 전달해주는부분 = list메서드 
		 * 
		 * Item item = new Item();
		 * item.setId(rs.getString("id"));
		 * item.setName(rs.getString("name"));
		 * ....
		 * 
		 * ====>RowMapper<Item> mapper = new BeanPropertyRowMapper<Item>(Item.class); 와 같음
		 * */
		return template.query("select * from item", mapper);
	}
	public Item selectOne(Integer id) {
		Map<String,Integer> param = new HashMap<>();
		param.put("id",id);
		return template.queryForObject("select * from item where id=:id", param, mapper);
	}
}
