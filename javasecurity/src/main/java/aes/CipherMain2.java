package aes;
/*
 * 키를 설정해서 AES 암호화 하기
 */
public class CipherMain2 {
	public static void main(String[] args) {
		String plain = "안녕하세요. 홍길동입니다.";
		String key = "abc1234567";
		String cipher1 = CipherUtil.encrypt(plain,key);
		System.out.println("암호문: "+cipher1);
		String plain2 = CipherUtil.decrypt(cipher1,key);
		System.out.println("복호문: " +plain2);
		//여러번새로고침해도  암호문 키가같다.
	}
}
