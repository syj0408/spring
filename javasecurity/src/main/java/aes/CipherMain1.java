package aes;
//여러번새로고침시   암호문 키가 다르다.
public class CipherMain1 {
	public static void main(String[] args) {
		String plain1 = "안녕하세요. 홍길동입니다.";
		String cipher1 = CipherUtil.encrypt(plain1);
		System.out.println("암호문: "+cipher1);
		String plain2 = CipherUtil.decrypt(cipher1);
		System.out.println("복호문: " +plain2);
	}
}
