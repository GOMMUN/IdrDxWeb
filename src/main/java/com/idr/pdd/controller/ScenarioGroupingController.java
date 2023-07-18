package com.idr.pdd.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.CM0901;
import com.idr.pdd.dto.CM0902;
import com.idr.pdd.service.ScenarioGroupingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("scenario")
public class ScenarioGroupingController {

	@Autowired
	private ScenarioGroupingService  service;
	
	@GetMapping("")
    public String init() {
        return "page/scenarioGrouping";
    }
	
	@ResponseBody
	@GetMapping("/find1")
    public List<CM0901> find1() {
		List<CM0901> list = service.findAll1();
		return list;

    }
	
	@ResponseBody
	@GetMapping("/find2")
    public List<CM0902> find2(CM0901 param) {
		List<CM0902> list = service.findAll2(param);
		return list;

    }

}
