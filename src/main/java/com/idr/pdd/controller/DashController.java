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
	@GetMapping("/find1")
    public List<WorkContents> find1() {
		
		List<WorkContents> list = service.findAll1();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/find2")
    public List<RejectContents> find2(String month) {
		
		List<RejectContents> list = service.findAll2(month);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/find3")
    public List<RejectContents> find3() {
		
		List<RejectContents> list = service.findAll3();
		return list;
    }
}
