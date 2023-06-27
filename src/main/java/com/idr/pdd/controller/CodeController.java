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

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.service.CodeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/code")
public class CodeController {
	
	@Autowired
	private CodeService service;

	@ResponseBody
	@GetMapping("/factory")
    public List<Code> factory(Model model) {
		
		List<Code> list = service.findFactroy();
		
		return list;
    }
	
	@ResponseBody
	@GetMapping("/block")
    public List<Code> block(@RequestParam("factoryid") String factoryid) {
    	List<Code> list = service.findBlock(factoryid);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/line")
    public List<Code> line(@RequestParam("factoryid") String factoryid) {
    	List<Code> list = service.findLine(factoryid);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/shift")
    public List<Code> shift(Model model) {
    	List<Code> list = service.findShift();
		return list;
    }
}
