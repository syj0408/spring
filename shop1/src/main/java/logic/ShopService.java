package logic;

import java.util.List;

import dao.ItemDao;

public class ShopService {
	private ItemDao itemDao;
	//dataSource를 이용해서  db와 연결된 ItemDao 객체가 주입이 됨. 
	public void setItemDao(ItemDao itemDao) {
		this.itemDao = itemDao;
	}
	public List<Item> getItemList() {
		return itemDao.list();
	}
	public Item getItemById(Integer id) {
		return itemDao.selectOne(id);
	}
}
