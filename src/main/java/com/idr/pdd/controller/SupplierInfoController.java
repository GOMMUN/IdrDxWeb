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

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.Vendor;
import com.idr.pdd.service.FactoryInfoService;
import com.idr.pdd.service.SupplierInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("supplier")
public class SupplierInfoController {

	@Autowired
	private SupplierInfoService service;
	
	@GetMapping("")
    public String init() {
        return "page/supplierinfo";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<Vendor> find() {
		List<Vendor> list = service.findAll();
		return list;
    }
	
	@ResponseBody
	@PostMapping("/check")
    public int checkCnt(@RequestBody Vendor param) {
		int cnt = service.checkCnt(param);
		return cnt;
		
    }
	
	@ResponseBody
	@PostMapping("/save")
    public int save(@RequestBody Vendor param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<Vendor> param) {
		return service.remove(param);
    }
		
}
