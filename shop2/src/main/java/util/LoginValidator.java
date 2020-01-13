package util;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import logic.User;

public class LoginValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) { //supports : 유효성 검증 대상이 되는 객체 여부 확인
		return User.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) { //obj 유저객체 , errors 바인딩유저객체
		User user = (User)obj;
		String group = "error.required";
		if(user.getUserid() == null || user.getUserid().length()==0) {
			errors.rejectValue("userid",group); //rejectValue("password",) =>프로퍼티 이름이랑 같아야함 ,rejectValue컬럼마다 하나씩 들어가도록
		}
		if(user.getPassword() == null || user.getPassword().length()==0) {
			errors.rejectValue("password",group);
		}
		if(errors.hasErrors()) { 
			errors.reject("error.input.user"); //global에러 ,errors : 입력이안된 에러들을 가지고 있음
		}
	}
}
