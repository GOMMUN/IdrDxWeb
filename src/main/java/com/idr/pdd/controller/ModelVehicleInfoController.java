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

import com.idr.pdd.dto.CM0501;
import com.idr.pdd.service.ModelVehicleInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("mvinfo")
public class ModelVehicleInfoController {

	@Autowired
	private ModelVehicleInfoService service;
	
	@GetMapping("")
    public String init() {
        return "page/modelvehicleInfo";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<CM0501> find() {
		List<CM0501> list = service.findAll();
		return list;
    }
	
	@ResponseBody
	@PostMapping("/check")
    public int checkCnt(@RequestBody CM0501 param) {
		int cnt = service.checkCnt(param);
		return cnt;
    }	
	
	@ResponseBody
	@PostMapping("/save")
    public int save(@RequestBody CM0501 param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<CM0501> param) {
		return service.remove(param);
    }	

}
