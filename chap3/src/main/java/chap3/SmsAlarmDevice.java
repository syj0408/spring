package chap3;

import org.springframework.stereotype.Component;

@Component
public class SmsAlarmDevice implements AlarmDevice{
	public void alarm(String name) {
		System.out.println(name + "에서 침입이 감지됨. 신고요망");
	}
}
