package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import logic.Item;
import logic.ShopService;

public class DetailController {
	private ShopService shopService; //이미 객체가 주입된 상태
	public void setShopService(ShopService shopService) {
		this.shopService = shopService;
	}
	@RequestMapping //detail.shop?id=1
	public ModelAndView detail(Integer id) { //detail(Integer id) 매개변수 이름이 같아야한다.
		Item item = shopService.getItemById(id);
		ModelAndView mav = new ModelAndView(); //"detail" 기본설정
		mav.addObject("item",item);
		return mav;
	}
	
}
