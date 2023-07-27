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

import com.idr.pdd.dto.CM0801;
import com.idr.pdd.service.DatasetDetailedService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("datasetdetail")
public class DatasetDetailedController {

	@Autowired
	private DatasetDetailedService service;
	
	@GetMapping("")
    public String init() {
        return "page/datasetDetailedMapping";
    }
	@GetMapping("dummy")
    public String init2() {
        return "page/dummy";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<CM0801> find() {
		List<CM0801> list = service.findAll();
		return list;
    }
	
	@ResponseBody
	@PostMapping("/create")
    public int create(@RequestBody CM0801 param) {
		return service.save(param);
    }	
	
	@ResponseBody
	@PutMapping("/modify")
    public int modify(@RequestBody CM0801 param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<Integer> param) {
		return service.remove(param);
    }

}
