package logic;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import dao.ItemDao;

@Repository 
public class ShopServicesyj implements ShopService {
	@Autowired
	private ItemDao itemDao;
	
	@Override
	public List<Item> getItemList(){
		return itemDao.list();
	}
	@Override
	public void itemCreate(Item item, HttpServletRequest request) {
		if(item.getPicture() != null && !item.getPicture().isEmpty()) {
			uploadFileCreate(item.getPicture(),request,"item/img/");
			item.setPictureUrl(item.getPicture().getOriginalFilename()); //setPictureUrl : item.getPicture()로부터 파일의 이름을 넣어줌
		}
		itemDao.insert(item);
	}
	@Override
	public Item getItem(String id) {
		return itemDao.selectOne(id);
	}
	@Override
	public void itemUpdate(Item item, HttpServletRequest request) {
		if(item.getPicture() != null && !item.getPicture().isEmpty()) {
			uploadFileCreate(item.getPicture(),request,"item/img/");
			item.setPictureUrl(item.getPicture().getOriginalFilename()); 
		}
		itemDao.update(item);
	}
	private void uploadFileCreate(MultipartFile picture, HttpServletRequest request, String path) {
	
	      String orgFile = picture.getOriginalFilename();
	      String uploadPath = request.getServletContext().getRealPath("/") + path; 
	      File fpath = new File(uploadPath);
	      if(!fpath.exists()) fpath.mkdirs();
	      try {
	         picture.transferTo(new File(uploadPath + orgFile));
	      }catch(Exception e) {
	         e.printStackTrace();
	      }

	}
	@Override
	public void itemDelete(String id) {
		itemDao.delete(id);
	}
}
