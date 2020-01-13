package controller;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import exception.BoardException;
import logic.Board;
import logic.ShopService;

@Controller
@RequestMapping("board")
public class BoardController {
	@Autowired
	private ShopService service;
	
	@RequestMapping("list")
	public ModelAndView list(Integer pageNum) {
		ModelAndView mav = new ModelAndView();
		if(pageNum == null || pageNum.toString().equals("")) {
			pageNum = 1;
		}
		int limit = 10;
		int listcount = service.boardcount(); //전체 등록된 게시물 건수
		List<Board> boardlist = service.boardlist(pageNum,limit);
		// 최대페이지
		int maxpage = (int)((double)listcount/limit + 0.95);
		// 보여지는 첫번째 페이지
		int startpage = (int)((pageNum/10.0 + 0.9)-1) * 10 + 1;
		// 보여지는 마지막 페이지
		int endpage = startpage + 9;
		if(endpage > maxpage) endpage = maxpage;
		// 화면에 출력되는 게시물 번호. 순서 db와 상관없음
		int boardno = listcount - (pageNum -1) * limit;
		mav.addObject("pageNum",pageNum);
		mav.addObject("maxpage",maxpage);
		mav.addObject("startpage",startpage);
		mav.addObject("endpage",endpage);
		mav.addObject("listcount",listcount);
		mav.addObject("boardlist",boardlist);
		mav.addObject("boardno",boardno);
		return mav;
	}
	
	@PostMapping("write")
	public ModelAndView write(@Valid Board board, BindingResult bresult, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		if(bresult.hasErrors()) {
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		try {
			service.boardWrite(board,request);
			mav.setViewName("redirect:list.shop");
		}catch(Exception e) {
			e.printStackTrace();
			throw new BoardException("게시물 등록에 실패하였습니다.","write.shop");
		}
		return mav;
	}

	/*
	@GetMapping("*")
	public ModelAndView detail(int num) {
		//db에서 num에 해당하는 게시물을 읽어서 Board 객체에 저장
	}
	*/
	
//	@GetMapping("write")
	@GetMapping("*")
	public ModelAndView getBoard(Integer num, HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		Board board= null;
		if(num == null) {
			board = new Board();
		}else {
			board = service.getBoard(num, request);
		}
		mav.addObject("board",board);
		return mav;
	}
	
	//CKEDITOR로 이미지 업로드
	@RequestMapping("imgupload")
	public String impupload(MultipartFile upload,String CKEditorFuncNum, 
			HttpServletRequest request, Model model) {
		//upload : 업로드된 이미지 정보 저장. 이미지 파일.
		String path = request.getServletContext().getRealPath("/")+"board/imgfile/";
		File f = new File(path);
		if(!f.exists()) f.mkdirs();
		if(!upload.isEmpty()) {
			//업로드될 파일을 저장할 File 객체 
			File file = new File(path, upload.getOriginalFilename());
			try {
				//업로드 파일 생성
				upload.transferTo(file);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		//절대경로 fullpath
		String fileName = "/shop3/board/imgfile/" + upload.getOriginalFilename();
		model.addAttribute("fileName",fileName);
		model.addAttribute("CKEditorFuncNum",CKEditorFuncNum);
		return "ckedit";
	}
}

