#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import logic.SaleItem;

public interface SaleItemMapper {

	@Insert("insert into saleitem (saleid, saleitemid, itemid, quantity)"
			+ " values (${symbol_pound}{saleid}, ${symbol_pound}{saleitemid}, ${symbol_pound}{itemid}, ${symbol_pound}{quantity})")
	void insert(SaleItem si);

	@Select("select * from saleitem where saleid = ${symbol_pound}{saleid}")
	List<SaleItem> select(Map<String, Object> param);

}
