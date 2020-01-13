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

@Controller
@RequestMapping("user") //user를 만남면 실행
public class UserController {
	@Autowired
	private ShopService service;

	@GetMapping("*")
	public String form(Model model) {
		model.addAttribute(new User());
		return null;
	}
	@PostMapping("userEntry")
	public ModelAndView userEntry(@Valid User user , BindingResult bresult){
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.input.user");
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		//useracount 테이블에 내용 추가. view단 = login.jsp로 이동.
		try {
			service.userInsert(user);
			mav.setViewName("redirect:login.shop"); //login = login.jsp
			//mav.addObject("user",new User()); //기존 ("user",user)
		}catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			bresult.reject("error.duplicate.user"); //에러발생시 중복이라는 메세지를  화면에 출력
		}
		return mav;
	}
	@PostMapping("login")
	public ModelAndView login(@Valid User user, BindingResult bresult,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.input.user");
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
		}catch (EmptyResultDataAccessException e) {
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
	public String checkmain(HttpSession session) {
		return "user/main";   //핵심로직
	}
	@RequestMapping("mypage")
	public ModelAndView checkmypage(String id,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User user = service.getUser(id); //loginUser사용 x admin인 경우 안됨 파라미터에 해당하는 id 조회.
		//salelist id - 사용자가 주문한 모든 주문내역 조회
		List<Sale> salelist = service.salelist(id);
		for(Sale sa : salelist) {
			//주문번호에 해당하는 주문 상품 내역 조회
			List<SaleItem> saleitemlist = service.saleItemList(sa.getSaleid()); //레코드한건에대한 주문정보.  saleid에대한 주문상품
			for(SaleItem si : saleitemlist) {
				//주문 상품 한개에 해당하는 Item 조회
				//주문된상품 삭제는 에러남.. db에 외래키가 필요함
				Item item = service.getItem(si.getItemid());
				si.setItem(item);
			}
			sa.setItemList(saleitemlist);
		}
		mav.addObject("user",user);
		mav.addObject("salelist",salelist);
		return mav;
	}
	@GetMapping(value={"update","delete"})  
	//두 개를 한번에 컨트롤러에서 사용?호출?할 수 있따.
	public ModelAndView checkview(String id,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User user = service.getUser(id);
		mav.addObject("user",user);
		return mav;
	}
	@PostMapping("update")
	public ModelAndView checkupdate(@Valid User user,BindingResult bresult,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			bresult.reject("error.input.user");
			return mav;
		}
		//비밀번호 검증 : 입력된 비밀번호와 db에 저장된 비밀번호를 비교
		//비밀번호가 일치 : update
		//비밀번호 불일치 : 메세지를 유효성출력으로 화면에 출력
		User loginUser = (User)session.getAttribute("loginUser"); //로그인한사람으로 비교해도됨 db까지할 필요없음 그러므로  admin까지 처리됨.
		if(!user.getPassword().equals(loginUser.getPassword())) {
			bresult.reject("error.login.password");
			return mav;
		}
		try {
			service.userUpdate(user);
			mav.setViewName("redirect:mypage.shop?id="+user.getUserid());
			if(!loginUser.getUserid().equals("admin")) {
				session.setAttribute("loginUser", user); // 업데이트가 성공이된다면! 로그인정보를 현재 입력된 정보로 변경함. 
			}
		}catch(Exception e) {
			e.printStackTrace();
			bresult.reject("error.user.update");
		}
		return mav;
	}
	@PostMapping("delete")
	public ModelAndView checkdelete(String userid,String password,HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User loginUser = (User)session.getAttribute("loginUser");
		if(!loginUser.getPassword().equals(password)) {
			throw new LoginException("회원탈퇴시 비밀번호가 틀립니다.","delete.shop?id="+userid);
		}
		try {
			service.userDelete(userid);
			if(loginUser.getUserid().equals("admin")) {
				mav.setViewName("redirect:/admin/list.shop");
			}else {
				session.invalidate();
				mav.addObject("msg",userid + "회원님. 탈퇴 되었습니다.");
				mav.addObject("url","login.shop");
				mav.setViewName("alert");
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw new LoginException("회원 탈퇴시 오류가 발생했습니다.전산부 연락 요망.","delete.shop?id="+userid);
		}
		return mav;
	}
}
