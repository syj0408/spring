#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package logic;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.web.multipart.MultipartFile;

public class Item {
	private String id;
	@NotEmpty(message="상품명을 입력하세요")
	private String name;
	@Min(value=10,message="10원 이상 가능합니다.")
	@Max(value=100000,message="100000원 이하만 가능합니다.")
	private int price;
	@NotEmpty(message="상품설명을 입력하세요.")
	@Size(min=10,max=100,message="10자이상 15자 이하 가능")
	private String description;
	private String pictureUrl;
	private MultipartFile picture; //업로드된 파일의 내용을 저장함.  picture=내가 업로드한 파일의 내용 enctype적어줬기때문에 기능함.
	public MultipartFile getPicture() {
		return picture;
	}
	public void setPicture(MultipartFile picture) {
		this.picture = picture;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPictureUrl() {
		return pictureUrl;
	}
	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}
	@Override
	public String toString() {
		return "Item [id=" + id + ", name=" + name + ", price=" + price + ", description=" + description
				+ ", pictureUrl=" + pictureUrl + "]";
	}
}
