package dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import logic.Sale;

public interface SaleMapper {

	@Select("select ifnull(max(saleid),0) from sale")
	Integer maxsailid();

	@Insert("insert into sale (saleid, userid, updatetime) values (#{saleid}, #{userid}, #{updatetime})")
	void insert(Sale sale);

	@Select({"<script>select * from sale <if test='userid != null'> where userid = #{userid}</if></script>"})
	List<Sale> select(Map<String, Object> param);

}
