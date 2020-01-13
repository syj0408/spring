package logic;

public class SaleItem {
	private int saleid;
	private int saleitemid;
	private String itemid;
	private int quantity;
	private Item item;
	public SaleItem() {}
	public SaleItem(int saleid, int saleitemid, ItemSet itemSet) {
		this.saleid =saleid;
		this.saleitemid =saleitemid;
		this.item = itemSet.getItem();	
		this.itemid= item.getId();  //상품id
		this.quantity= itemSet.getQuantity(); //itemSet으로부터 수량을 가져옴
	}
	public int getSaleid() {
		return saleid;
	}
	public void setSaleid(int saleid) {
		this.saleid = saleid;
	}
	public int getSaleitemid() {
		return saleitemid;
	}
	public void setSaleitemid(int saleitemid) {
		this.saleitemid = saleitemid;
	}
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	
}
