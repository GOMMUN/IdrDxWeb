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

import com.idr.pdd.dto.DxCube;
import com.idr.pdd.service.dxValueChainCubeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("dxcube")
public class dxValueChainCubeController {

	@Autowired
	private dxValueChainCubeService service;
	
	@GetMapping("")
    public String init() {
        return "page/dxValueChainCube";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<DxCube> find() {
		List<DxCube> list = service.findAll();
		return list;
    }
	
	@ResponseBody
	@PostMapping("/save")
    public int save(@RequestBody DxCube param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<DxCube> param) {
		return service.remove(param);
    }
	
}
