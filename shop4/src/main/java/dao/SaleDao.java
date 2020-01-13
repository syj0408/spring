package dao;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import dao.mapper.SaleMapper;
import logic.Sale;

@Repository
public class SaleDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	private Map<String,Object> param = new HashMap<>();

	public int getMaxSaleId() { //현재 세일에 등록된 세일아이디의 최대  녹음191219 31번 4분쯤
		Integer max =  sqlSession.getMapper(SaleMapper.class).maxsailid();  //sale테이블에 저장된 saleid값의 최대값
		return max+1;  //database에서 최대값 다음에다가 저장하기위해 max+1
	}
	public void insert(Sale sale) {  //sale 레코드 1건을 등록
		sqlSession.getMapper(SaleMapper.class).insert(sale);
	}
	public List<Sale> list(String id) {
		param.clear();
		if(!id.equals("admin")) { //admin이아닌경우만 내 주문정보만 확인 할 수 있음
			param.put("userid",id);
		}
		return sqlSession.getMapper(SaleMapper.class).select(param);
	}
}
