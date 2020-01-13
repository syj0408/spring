#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package dao.mapper;
/* @select ,insert 등 같은 반환형인 어노테이션 여러개 사용x ,하나로 사용해야함.*/
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import logic.Item;

public interface ItemMapper {
	
	@Select({"<script>select * from item ",
			 "<if test='id != null'> where id=${symbol_pound}{id}</if></script>"})
	List<Item> select(Map<String,Object> param);
	
	@Select("select ifnull(max(id),0) from item")
	int maxid();

	@Insert("insert into item (id, name, price, description, pictureUrl) values (${symbol_pound}{id}, ${symbol_pound}{name}, ${symbol_pound}{price}, ${symbol_pound}{description}, ${symbol_pound}{pictureUrl})")
	void insert(Item item);

	@Update("update item set name=${symbol_pound}{name}, price=${symbol_pound}{price}, description=${symbol_pound}{description}, pictureUrl=${symbol_pound}{pictureUrl} where id=${symbol_pound}{id}")
	void update(Item item);

	@Delete("delete from item where id=${symbol_pound}{id}")
	void delete(Map<String, Object> param);
	
	
}
