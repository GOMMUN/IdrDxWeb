package com.idr.pdd.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class MainController {
	
	@GetMapping("/")
    public String init(Model model) {
//    	model.addAttribute("title", "");
        return "redirect:/workDailyReport";
    }
}
