package controller;

import java.util.List;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import exception.LoginException;
import logic.Item;
import logic.Sale;
import logic.SaleItem;
import logic.ShopService;
import logic.User;

@Controller //@Component + Controller : 객체를 만들고 컨트롤러의 기능까지 같이 수행
@RequestMapping("user") //user/xxx.shop
public class UserController {
	@Autowired
	private ShopService service;
	
	
	@GetMapping("*")
	public String form(Model model) {
		model.addAttribute(new User());
		return null;
	}
	@PostMapping("userEntry")
	public ModelAndView userEntry(@Valid User user,BindingResult bresult) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.input.user");
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		//useraccount 테이블에 내용 등록. 뷰단은 login.jsp로 이동
		try {
			service.userInsert(user);
			mav.setViewName("user/login"); //redirect 를 사용하면 아이디값이 들어가지 않음
			mav.addObject("user",user);//값도 넘어감
		}catch(DataIntegrityViolationException e) {
			//e.printStackTrace();
			bresult.reject("error.duplicate.user");
		}
		return mav;
	}
	@PostMapping("login")
	public ModelAndView login(@Valid User user,BindingResult bresult,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.login.user");
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		try {
			User dbUser = service.getUser(user.getUserid());
			if(!dbUser.getPassword().equals(user.getPassword())) {
				bresult.reject("error.login.password");
				return mav;
			}else {
				session.setAttribute("loginUser",dbUser);
				mav.setViewName("redirect:main.shop");
			}
		}catch(EmptyResultDataAccessException e) {
			e.printStackTrace();
			bresult.reject("error.login.id");
		}
		return mav;
	}
	
	@RequestMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:login.shop";
	}
	
	@RequestMapping("main") //UserLoginAspect 클래스에 해당하는 핵심로직
	public String checkmain() { //session을 받지 않으면 로그인안한사람도 접근가능
		return "user/main";
	}
	
	//로그인 검증, (로그인 정보 != 파라미터정보 접근 불가, admin은 가능)
	@RequestMapping("mypage")
	public ModelAndView page(String id,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		/*
		User user = service.getUser(id); //loginuser를 쓸 수 없음 admin인경우 파라미터에 해당하는 id 조회
		//사용자가 주문한 모든 주문내역 조회
		List<Sale> salelist = service.salelist(id);
		for(Sale sa : salelist) {
			//주문번호에 해당하는 주문 상품내역 조회
			//db에 외래키 필요함
			List<SaleItem> saleitemlist = service.saleItemList(sa.getSaleid());
			for(SaleItem si : saleitemlist) {
				//주문상품 한개에 해당하는 Item 조회
				Item item = service.getItem(si.getItemid());
				si.setItem(item);
			}
			sa.setItemList(saleitemlist);
		}
		mav.addObject("user",user);
		mav.addObject("salelist",salelist);
		 */
		return mav;
	}
	
	//delete.shop과 update.shop에서만 사용할 수 있게 수정 : * 는 상관없이 모두 사용
	@GetMapping(value= {"update","delete"}) //회원정보수정화면,탈퇴확인화면
	public ModelAndView checkview(String id,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User user = service.getUser(id);
		mav.addObject("user", user);
		return mav;
	}
	
	@PostMapping("update")//회원정보 수정 눌렀을시
	public ModelAndView checkupdate(@Valid User user, BindingResult bresult,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.input.user");
			return mav;
		}
		//비밀번호 검증 : 입력된 비밀번호 , db에 등록된 비밀번호 비교
		// 일치:update
		// 불일치:메세지를 유효성출력으로 화면에 출력
		User loginUser = (User)session.getAttribute("loginUser");//admin인지 확인하기 위해
		if(!user.getPassword().equals(loginUser.getPassword())){
			bresult.reject("error.login.password");
			return mav;
		}
		try{
			service.userupdate(user);
			mav.setViewName("redirect:mypage.shop?id="+user.getUserid());
			if(!loginUser.getUserid().equals("admin")) {
				session.setAttribute("loginUser", user); //업데이트 했을때 login정보도 바꿔줌
			}
		}catch(Exception e) {
			e.printStackTrace();
			bresult.reject("error.user.update");
		}
		return mav;
	}
	
	//관리자도 강제탈퇴가능해야함, 유효성 검증 하지않았음
	@PostMapping("delete")//		 user를 받아와도 되고, String id, String password로 받아와도 됨
	public ModelAndView checkdelete(User user , HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User loginUser = (User)session.getAttribute("loginUser");
		if(!user.getPassword().equals(loginUser.getPassword())){
			throw new LoginException("비밀번호가 틀립니다.","delete.shop?id="+user.getUserid());
		}
		try {
			service.userDelete(user.getUserid());
			if(loginUser.getUserid().equals("admin")) {
				mav.setViewName("redirect:/admin/list.shop");
			}else {
				session.invalidate();
				mav.addObject("msg",user.getUserid()+"회원님. 탈퇴 되었습니다.");
				mav.addObject("url","login.shop");
				mav.setViewName("alert");
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw new LoginException("회원 탈퇴시 오류가 발생했습니다. 전산부 연락 요망","delete.shop?id="+user.getUserid());
		}
		return mav;
	}
}
