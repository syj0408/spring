package controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import logic.Item;
import logic.ShopService;

//설정에 의해 index.shop 요청시 호출되는 클래스
public class IndexController {
	private ShopService shopService;
	//itemDao 객체를 저장하고 있는 shopService 객체 주입
	public void setShopService(ShopService shopService) { //이 메서드를 통해서 shopService 객체가 주입됨. 호출됬을때 이미 주입된상태
		this.shopService = shopService;
	}
	@RequestMapping //index.shop 요청시 호출되는 메서드 [어노테이션사용]
	//ModelAndView : Model : view에 전달될 데이터 저장하는 객체
			//		 view : view 설정 객체
	//itemList : item 테이블의 모든 컬럼, 모든레코드 정보를 Item 객체의 List 객체로 저장
	public ModelAndView itemList() {
		List<Item> itemList = shopService.getItemList();
		ModelAndView mav = new ModelAndView("index"); //view 설정
		mav.addObject("itemList",itemList); //데이터 설정
		return mav;//view의이름 저장된ㄷ ㅔ이터를 다가지고있는 modelandview -> dispatcherservle이 받음
	}
}
