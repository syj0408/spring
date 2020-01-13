package controller;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import logic.ShopService;
import logic.User;
import util.UserValidator;

public class UserEntryController {
	private ShopService shopService;
	private UserValidator userValidator;
	public void setShopService(ShopService shopService) {
		this.shopService = shopService;
	}
	
	public void setUserValidator(UserValidator userValidator) {
		this.userValidator = userValidator;
	}
	@ModelAttribute
	public User getUser() { //form에서  @ModelAttribute에서 전달해주는 데이터를 받아옴
		return new User();
	}
	@RequestMapping(method=RequestMethod.GET)
	public String userEntryForm() {
	//	return "userEntry"; //view만 설정
		return null;
	}
	/*
	 * @RequestMapping(method=RequestMethod.POST) public String userEntry() { return
	 * "userEntry"; }
	 */
	@RequestMapping(method=RequestMethod.POST)
	public ModelAndView userEntry(User user,BindingResult bindResult) {
		//user : 파라미터값(입력된 값)을 저장하고 있는 객체
		ModelAndView mav = new ModelAndView();
		userValidator.validate(user, bindResult);
		if(bindResult.hasErrors()) { //에러가 존재하면
			mav.getModel().putAll(bindResult.getModel());
			return mav; 
		}
		try {
			shopService.insertUser(user);
			mav.addObject("user",user);
			//DataIntegrityViolationException : spring jdbc에서 발생되는 예외
				//키 중복 오류
		}catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			bindResult.reject("error.duplicate.user");
			mav.getModel().putAll(bindResult.getModel());
			return mav;
		}
		mav.setViewName("userEntrySuccess");
		return mav;
	}
	@InitBinder //파라미터값 형변환
	public void initBinder(WebDataBinder binder) {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		/*
		 * Date.class:형변환 대상이 되는 자료형
		 * format : 형식지정
		 * true/false : 비입력허용 (선택입력)/비입력불허(필수입력)
		 */
		binder.registerCustomEditor(Date.class, new CustomDateEditor(format,false));
	}
}
