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

import com.idr.pdd.dto.Material;
import com.idr.pdd.service.MaterialMasterService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("material")
public class MaterialMasterController {

	@Autowired
	private MaterialMasterService service;
	
	@GetMapping("")
    public String init() {
        return "page/materialMaster";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<Material> findMateriaMasterAll(Material data) {
		List<Material> list = service.findMateriaMasterAll(data);
		return list;
    }	
	
	@ResponseBody
	@PostMapping("/check")
    public int checkCnt(@RequestBody Material param) {
		int cnt = service.checkCnt(param);
		return cnt;
    }	
	
	@ResponseBody
	@PostMapping("/save")
    public int save(@RequestBody Material param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<Material> param) {
		return service.remove(param);
    }
	
}
