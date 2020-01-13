package aes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/*
 * userbackup 테이블의 암호화된 email값을 복호화 하여 화면에 출력하기.
 * key는 아이디 해쉬값의 앞의 16자리로 정한다.
 */
public class CipherMain4 {
	public static void main(String[] arg)  throws Exception{
		Class.forName("org.mariadb.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/classdb", "scott", "1234");
		PreparedStatement pstmt = conn.prepareStatement("select userid,email from userbackup"); //userbackup를 읽어옴
		ResultSet rs = pstmt.executeQuery(); //한줄씩ㅇ ㅣㄺ어옴
		while(rs.next()) {
			String userid = rs.getString("userid"); 
			String key = CipherUtil.makehash(userid).substring(0,16);  //hash값을 읽고 앞에 16자리를 읽어서 key를 만듬
			String email = rs.getString("email"); //암호화된 email
			String plainEmail = CipherUtil.decrypt(email,key); // 복호화된 이메일을 가져옴
			System.out.println(userid+" 이메일  = "+plainEmail); //consol에 출력
		}
	}
}
