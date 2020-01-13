package chap2;

import java.util.List;

public class BuildRunner {
	
	private String path;
	public void setPath(String path) {
		this.path = path;  //c:/setup/
	}
	public void build(List<String> srcdirs,String bindir) {
		String info = "프로젝트 경로:" + path + "\n";   //path:c:/setup/
		for(String dir : srcdirs) {
			info += "소스 파일 경로 :" + dir + "\n";    //dir:src/srcResource
		}
		info += "바이트코드 경로 :" + bindir + "\n";  //bindir:bin/
		System.out.println(info);
	}
}
