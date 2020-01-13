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

import logic.Board;

public interface BoardMapper {
	String boardsql = "select num,name,pass,subject,content,file1 fileurl,regdate,readcnt,grp,grplevel,grpstep from board";
	
	@Select({"<script> select count(*) from board "
			+ "<if test='type != null'> where ${symbol_dollar}{type} like ${symbol_pound}{content}</if></script>"})
	int count(Map<String, Object> param);
	
	@Select({"<script>",
			boardsql,
			"<if test='type != null'> where ${symbol_dollar}{type} like ${symbol_pound}{content}</if>",
			"<if test='num != null'> where num = ${symbol_pound}{num}</if>",
			"<if test='num == null'> order by grp desc, grpstep limit ${symbol_pound}{startrow}, ${symbol_pound}{limit}</if>",
			"</script>"})
	List<Board> list(Map<String, Object> param);

	@Select("select ifnull(max(num),0) from board")
	int maxnum();

	@Insert("insert into board (num, name, pass, subject, content, file1, regdate, readcnt, grp, grplevel, grpstep)"
			+ " values (${symbol_pound}{num} ,${symbol_pound}{name} ,${symbol_pound}{pass} , ${symbol_pound}{subject}, ${symbol_pound}{content}, ${symbol_pound}{fileurl}, now(), 0, ${symbol_pound}{grp}, ${symbol_pound}{grplevel}, ${symbol_pound}{grpstep})")
	void insert(Board board);

	@Update("update board set readcnt = readcnt + 1 where num=${symbol_pound}{num}")
	void readcntadd(Map<String, Object> param);

//	@Select("select num,name,pass,subject,content,file1 fileurl,regdate,"
//			+"readcnt,grp,grplevel,grpstep from board where num = ${symbol_pound}{num}")
//	Board selectOne(Integer num);
	
	@Update("update board set grpstep = grpstep + 1 where grp =${symbol_pound}{grp} and grpstep > ${symbol_pound}{grpstep}")
	void updategrpstep(Map<String, Object> param);

	@Update("update board set name=${symbol_pound}{name}, subject=${symbol_pound}{subject}, content=${symbol_pound}{content}, file1=${symbol_pound}{fileurl} where num=${symbol_pound}{num}")
	void update(Board board);
	
	@Delete("delete from board where num=${symbol_pound}{num}")
	void delete(Board board);

}
