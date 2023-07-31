package com.idr.pdd.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@ResponseBody
	@PostMapping("/create1")
    public int create1(@RequestBody CM0901 param) {
			return service.save1(param);
    }
	
	@ResponseBody
	@PutMapping("/modify1")
    public int modify1(@RequestBody CM0901 param) {
		return service.save1(param);
    }
	
	@ResponseBody
	@PutMapping("/remove1")
    public int remove1(@RequestBody List<Integer> param) {
		return service.remove1(param);
    }
	
	@ResponseBody
	@PostMapping("/create2")
    public int create2(@RequestBody CM0902 param) {
			return service.save2(param);
    }
	
	@ResponseBody
	@PutMapping("/modify2")
    public int modify2(@RequestBody CM0902 param) {
		return service.save2(param);
    }
	
	@ResponseBody
	@PutMapping("/remove2")
    public int remove2(@RequestBody List<Integer> param) {
		return service.remove2(param);
    }
}
