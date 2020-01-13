#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import logic.User;

public interface UserMapper {

	@Insert("insert into useraccount (userid, username, password, birthday, phoneno, postcode, address, email ) "
			+ " values (${symbol_pound}{userid}, ${symbol_pound}{username}, ${symbol_pound}{password}, ${symbol_pound}{birthday}, ${symbol_pound}{phoneno}, ${symbol_pound}{postcode}, ${symbol_pound}{address}, ${symbol_pound}{email})")
	void insert(User user);
	
    @Select({"<script>select * from useraccount ",
    		 "<if test='userid != null'> where userid=${symbol_pound}{userid}</if>",
    		 "<if test='idchks != null'> where userid in",
    		 "<foreach collection='idchks' item='id' separator=',' index='i' open='(' close=')'>${symbol_pound}{id}</foreach></if>",
    		 "</script>"})
	List<User> select(Map<Object, Object> param);
    
    @Update("update useraccount set username=${symbol_pound}{username}, phoneno=${symbol_pound}{phoneno} ,postcode=${symbol_pound}{postcode}, address=${symbol_pound}{address}, email=${symbol_pound}{email}, birthday=${symbol_pound}{birthday} where userid=${symbol_pound}{userid}")
	void update(User user);

    @Delete("delete from useraccount where userid=${symbol_pound}{userid}")
	void delete(String userid);

}
