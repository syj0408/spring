package xml;

public class UpdateMemberInfoTraceAdvice {
	public void traceReturn(Object result, String memberId, UpdateInfo info) //핵심로직전달값, id 해당값, 정보값
	{ 
		System.out.println("[TA] 정보 수정: 결과=" + result + ", 대상회원=" + memberId + ", 수정 정보=" + info);
	}
}
