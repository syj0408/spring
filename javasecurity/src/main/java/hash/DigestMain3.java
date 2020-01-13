package hash;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

/*
 * 화면에서 아이디와 비밀번호를 입력받아서
 * 해당 아디디가 userbackup 테이블에 없으면 "아이디 확인" 출력
 * 해당 아이디의 비밀번호를 비교해서 맞으면 "반갑습니다. 아이디님" 출력
 * 해당 아이디의 비밀번호를 비교해서 틀리면 "비밀번호 확인" 출력
 * 
 */
public class DigestMain3 {
	public static void main(String[] args) throws Exception {
		//db 설정
		Class.forName("org.mariadb.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/classdb", "scott", "1234");
		PreparedStatement pstmt = conn.prepareStatement("select password from userbackup where userid=?");
		//화면 입력
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		System.out.println("아이디를 입력하세요:");
		String inId = br.readLine(); //BufferedReader  == br.readLine()할 수 있음.
		System.out.println("비밀번호를 입력하세요:");
		String inPass = br.readLine();//한줄 입력
		pstmt.setString(1, inId);
		ResultSet rs = pstmt.executeQuery(); 
		if(rs.next()){ //아이디 존재
			MessageDigest md = MessageDigest.getInstance("SHA-256");
	         String hashpass = "";
	         byte[] plain = inPass.getBytes();
	         byte[] hash = md.digest(plain);
	         for(byte b : hash) {
	            hashpass += String.format("%02X", b);
	         }
	         if(rs.getString(1).equals(hashpass)) {
	        	 System.out.println(inId+"님 로그인 되었습니다.");
	         }else {
	        	 System.out.println("아이디 확인");
	         }
		}else {//ㅇㅏ이디 없음
			System.out.println("아이디 확인하세요");
		}
	}
}
