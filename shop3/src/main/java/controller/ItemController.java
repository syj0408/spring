package controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import logic.Item;
import logic.ShopService;

@Controller //@Component + Controller 기능
@RequestMapping("item")  //   item/xxx.shop 이름에 맞춰서 item컨트롤러를 호출함. 
public class ItemController {
	@Autowired //주입,  ShopService는 itemController로 주입
	private ShopService service;
	
	@RequestMapping("list") //	item/list.shop 요청이 들어오면 
	public ModelAndView list() { //  list 호출
		//itemList : item 테이블의 모든 레코드와 모든 컬럼 정보를 저장.
		List<Item> itemList = service.getItemList(); //getItemList 호출.  모든 item형태를 List형태로 호출
		ModelAndView mav = new ModelAndView(); //뷰 : item/list
		mav.addObject("itemList",itemList);
		return mav; // 	/WEB-INF/view/item/list.jsp
	}
	@RequestMapping("create")
	public ModelAndView create() {
		ModelAndView mav = new ModelAndView("item/add"); //상품등록하면 주소 이름이 create가아니고  add.jsp로 바뀜
		mav.addObject(new Item());
		return mav;
	}
	@RequestMapping("register")
	public ModelAndView register(@Valid Item item, BindingResult bresult,HttpServletRequest request) { //파라미터값은 item으로가져옴 , @Valid 유효성 검증
		ModelAndView mav = new ModelAndView("item/add"); 
		if(bresult.hasErrors()) {
			mav.getModel().putAll(bresult.getModel());
			return mav; //add.jsp로 이동
		}
		service.itemCreate(item,request);
		mav.setViewName("redirect:/item/list.shop"); //등록을 하게되면  list.shop로 주소가바뀜 브라우저로 하여금 item.list.shop을 재호출하게끔함.
		return mav;
	}
	@PostMapping("update")   //@PostMapping post타입
	public ModelAndView update(@Valid Item item, BindingResult bresult, HttpServletRequest request) { //@Valid item들의 유효성검사.
		ModelAndView mav = new ModelAndView("item/edit");
		if(bresult.hasErrors()) {
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		service.itemUpdate(item,request);
		mav.setViewName("redirect:/item/list.shop");
		return mav;
	}
	@RequestMapping("delete")
	public ModelAndView deleteItem(String id) {
		ModelAndView mav = new ModelAndView();
		service.delete(id);
		mav.setViewName("redirect:/item/list.shop");
		return mav;
	}
	//@RequestMapping("*")  
	@GetMapping("*")   //요청을 하지않고 * 일때 => 그 외 요청 정보 호출  ,@GetMapping get방식으로 들어오는부분 호출
	public ModelAndView itemSelect(String id) {
		Item item = service.getItem(id);
		ModelAndView mav = new ModelAndView(); //view가 null이면 맞춰 들어감
		mav.addObject("item",item);
		return mav;
	}
/*	@RequestMapping("detail")  
	public ModelAndView detail(Integer id) {
		Item item = service.itemdetail(id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("item",item);
		return mav;
	}*/
}
