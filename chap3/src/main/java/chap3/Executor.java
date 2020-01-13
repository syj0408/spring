package chap3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
//Component = spring에의해 객체화가됨 'executor'이름으로 컨테이너에 저장
public class Executor {
   @Autowired  //의존성 주입 . 컨테이너 중  Worker 객체를 찾아서 주입.
   private Worker worker;
   public void addUnit(WorkUnit unit) {
      worker.work(unit);
   }
}