package syjtest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("employee")
public class EmployeeRegController {
	@Autowired
	private EmployeeService service;

	@GetMapping("registration")  //Get
	public ModelAndView regForm() {
		ModelAndView mav = new ModelAndView();
		mav.addObject(new Employee());
		return mav;
	}

	@PostMapping("registration") //POST
	public ModelAndView register(@Valid Employee employee, BindingResult bresult) {
		ModelAndView mav = new ModelAndView();
		if (bresult.hasErrors()) {
			bresult.reject("error.input");
			mav.getModel().putAll(bresult.getModel());
			return mav;
		}
		try {
			service.register(employee);
			mav.setViewName("employee/success");
		} catch (Exception e) {
			e.printStackTrace();
			bresult.reject("error.registration");
		}
		return mav;
	}
}
