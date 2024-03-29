#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package logic;

public class ItemSet {
	private Item item;
	private Integer quantity;
	public ItemSet(Item item,Integer quantity) {
		this.item = item;
		this.quantity = quantity;
	}
	//getter setter toString
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "ItemSet [item=" + item + ", quantity=" + quantity + "]";
	}
	
}
