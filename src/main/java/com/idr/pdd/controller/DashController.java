package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.service.DashService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/dash")
public class DashController {
	
	@GetMapping("")
    public String init() {
        return "page/dash";
    }

	@Autowired
	private DashService service;

	@ResponseBody
	@GetMapping("/findTo")
    public List<WorkContents> findTo() {
		
		List<WorkContents> list = service.findAllTo();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findYe")
    public List<WorkContents> findYe() {
		
		List<WorkContents> list = service.findAllYe();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findSpe")
    public List<RejectContents> findSpe(String month) {
		
		List<RejectContents> list = service.findAllSpe(month);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findFre")
    public List<RejectContents> findFre() {
		
		List<RejectContents> list = service.findAllFre();
		return list;
    }
}
