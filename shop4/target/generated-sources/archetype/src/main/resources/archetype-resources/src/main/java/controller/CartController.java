#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import exception.CartEmptyException;
import logic.Cart;
import logic.Item;
import logic.ItemSet;
import logic.Sale;
import logic.ShopService;
import logic.User;

@Controller
@RequestMapping("cart")  //cart가 들어오면 여기 호출
public class CartController {
	@Autowired
	private ShopService service;
	
	@RequestMapping("cartAdd")
	public ModelAndView add(String id, Integer quantity,HttpSession session) {
		ModelAndView mav = new ModelAndView("cart/cart"); //view이름등록
		Item item = service.getItem(id); //선택된 상품객체
		Cart cart = (Cart)session.getAttribute("CART"); //session으로부터 가져온 CART
		if(cart == null) { //장바구니를 등록한적이 없는 경우
			cart= new Cart(); //session에 등록된 cart를 만듬
			session.setAttribute("CART", cart); 
		}
		cart.push(new ItemSet(item,quantity));
		mav.addObject("message",item.getName() + ":" + quantity + "개 장바구니 추가");
		mav.addObject("cart",cart);
		return mav;
	}
	/*
	 * index 파라미터값에 해당하는 값을 Cart의 ItemSetList 객체에서 제거
	 * message에  xxx상품을 장바구니에서 '삭제했습니다' 제거 메세지 view(cart.jsp)에 전달./session으로부터 가져옴
	 * 1.session에서 CART 객체를 조회
	 * 2.cart 객체에서 itemSetList 객체에서  index에 해당하는 값을 제거
	 *	 ItemSet itemSet = cart.getItemSetList().remove(index)
	 * 3.message,cart를 view에 전달
	 */
	@RequestMapping("cartDelete")
	public ModelAndView delete(HttpSession session, int index) { //Integer index는 에러  = 객체일때 사용
		ModelAndView mav = new ModelAndView("cart/cart"); // 메세지 view(cart.jsp)에 전달
		Cart cart = (Cart)session.getAttribute("CART"); //cart를 세션에 등록했으니까  session에서 CART 객체를 조회
		//Integer index로 하면 사용 할 수는 있음 , ItemSet itemSet=null / cart.getItemSetList().remove(index); 근데 삭제가 안됨.
		ItemSet itemSet = null;
		try {
			itemSet = cart.getItemSetList().remove(index); //index parameter값 이름과 같아야함 index제거하고 itemSet으로 전달.
			mav.addObject("message", itemSet.getItem().getName()+"상품을 삭제했습니다.");			
		}catch(Exception e) {
			mav.addObject("message","장바구니 상품이 삭제되지 않았습니다.");
		}
		mav.addObject("cart",cart);
		return mav;
	}
	/*
	 * 장바구니 상품이 없는 경우  CartEmptyException를 발생시킴
	 * "장바구니에 상품이 없습니다." 메세지를 alert창으로 출력
	 *  /item/list.shop 페이지 이동
	 */
	@RequestMapping("cartView")
	public ModelAndView delete(HttpSession session) { //Integer index는 에러  = 객체일때 사용
		ModelAndView mav = new ModelAndView("cart/cart");
		Cart cart = (Cart)session.getAttribute("CART");
		if(cart == null || cart.getItemSetList().size() == 0 ) {
			throw new CartEmptyException("장바구니에 상품이 없습니다.","../item/list.shop");
		}
		mav.addObject("cart",cart);
		return mav;
	}
	//주문전 확인
	//반드시 로그인이 필요.
	//장바구니에 상품이 존재해야함.
	@RequestMapping("checkout") //전에 CartAspect(aop)를 실행
	public String checkout(HttpSession session) {
		return "cart/checkout";
	}
	/*
	 * 주문 확정
	 * 1. 세션에서 CART,loginUser 정보 조회
	 * 2. sale, saleitem 테이블 데이터 추가
	 * 3. 장바구니에서 상품 제거
	 * 4. cart/end.jsp 페이지로 이동
	 */
	@RequestMapping("end") //전에 CartAspect(aop)를 실행
	public ModelAndView checkend(HttpSession session) { //checkend = Aspect(aop)클래스의 대상  check로 시작하기때문
		ModelAndView mav = new ModelAndView();
		Cart cart = (Cart)session.getAttribute("CART");   //로그인 카트 정보
		User loginUser = (User)session.getAttribute("loginUser"); //로그인 유저 정보
		//sale : 주문 정보 내역
		Sale sale = service.checkend(loginUser,cart);  //2. ,핵심부분
		long total = cart.getTotal(); //cart가 가지고있는 주문 상품의 총 금액 리턴
		session.removeAttribute("CART"); //3. / 아이템을 이미 주문했기때문에 주문 내용을 제거 
		mav.addObject("sale",sale); //주문상품
		mav.addObject("total",total); //총금액을 mav =>end.jsp로 보냄
		return mav;
	}
	
}
