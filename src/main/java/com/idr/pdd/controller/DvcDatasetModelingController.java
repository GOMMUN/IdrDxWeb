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

import com.idr.pdd.dto.CM0701;
import com.idr.pdd.service.DvcDatasetModelingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("dvcmodel")
public class DvcDatasetModelingController {

	@Autowired
	private DvcDatasetModelingService service;
	
	@GetMapping("")
    public String init() {
        return "page/dvcDatasetModeling";
    }
	
	@ResponseBody
	@GetMapping("/findAxis")
    public List<CM0701> findAxis() {
		List<CM0701> list = service.findAxis();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findGroup")
    public List<CM0701> findGroup(CM0701 param) {
		List<CM0701> list = service.findGroup(param);
		return list;
    }
	
	@ResponseBody
	@PostMapping("/check")
    public int checkCnt(@RequestBody CM0701 param) {
		int cnt = service.checkCnt(param);
		return cnt;
    }	
	
	@ResponseBody
	@PostMapping("/save")
    public int save(@RequestBody CM0701 param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<CM0701> param) {
		return service.remove(param);
    }	

}
