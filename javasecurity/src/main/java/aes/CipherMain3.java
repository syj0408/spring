package aes;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/*
 * useraccount 테이블의 email 값을 읽어서
 * userbackup 테이블의 email을 암호화 하기.
 * key는 userid의 해쉬값의 앞 16자리로 정한다.
 * 
 */
public class CipherMain3 {
	public static void main(String[] args) throws Exception {
		//db연결
		Class.forName("org.mariadb.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/classdb", "scott", "1234");
		PreparedStatement pstmt = conn.prepareStatement("select * from useraccount");
		ResultSet rs = pstmt.executeQuery();
		//
		while (rs.next()) {
			String userid = rs.getString("userid");
			String key = CipherUtil.makehash(userid).substring(0,16);
			String email = rs.getString("email");
			String newEmail = CipherUtil.encrypt(email, key); //암호화이메일
//			System.out.println(newEmail);
			pstmt = conn.prepareStatement("update userbackup set email=? where userid=?");
			pstmt.setString(1, newEmail);
			pstmt.setString(2, userid);
			pstmt.execute();
		}
	}
}
