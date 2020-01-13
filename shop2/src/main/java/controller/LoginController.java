package controller;

import javax.servlet.http.HttpSession;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import logic.ShopService;
import logic.User;

public class LoginController {
	private ShopService shopService;
	private Validator validator;
	public void setShopService(ShopService shopService) {
		this.shopService = shopService;
	}
	public void setValidator(Validator validator) {
		this.validator = validator;
	}
	@GetMapping      
	//spring4.0에서 쓰는방식 get방식으로 들어오는 부분일때 호출하는방식. @RequestMapping(method=RequestMethod.GET)이와 동일함.
	public String loginForm(Model model) {
		model.addAttribute(new User());
		return "login";
	}
	@PostMapping
	public ModelAndView login(User user,BindingResult bresult,HttpSession session) { //bresult = 빈칸이면ㅇ 에러값을 전달 ex)아이디를입력하세요.
		ModelAndView mav = new ModelAndView();
		validator.validate(user, bresult);
		if(bresult.hasErrors()) {
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		try {
			User dbuser = shopService.getUser(user.getUserid()); // 받은 user.getUserid() 를 dbuser로 전달 /dbuser가 null 이면 에러발생  EmptyResultDataAccessException
		if(user.getPassword().equals(dbuser.getPassword())) {  //비밀번호 일치. dbuser.getPassword()) db에등록된 비밀번호
				session.setAttribute("loginUser", dbuser); //loginUser을 세션에 등록 ,db에 user정보를 다 가지고있다..?
			}else { //비밀번호가 틀린경우
				bresult.reject("error.login.password");
				mav.getModel().putAll(bresult.getModel());
				return mav;
			}
		}catch (EmptyResultDataAccessException e) { //id가 없는 경우
			//EmptyResultDataAccessException  : db에서 조회된 레코드가 없는 경우
			bresult.reject("error.login.id"); //messages.txt에 있는 error.login.id의 메세지가 전달됨.
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		mav.setViewName("loginSuccess"); //비밀번호가 맞는 경우만 view단을  loginSuccess로보내줌
		return mav;
	}
}
