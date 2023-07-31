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
import com.idr.pdd.dto.ModelNM;
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
//    public List<Code> block(@RequestParam("factoryid") String factoryid) {
	public List<Code> block() {
    	List<Code> list = service.findBlock();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/line")
    public List<Code> line() {
    	List<Code> list = service.findLine();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/shift")
    public List<Code> shift(Model model) {
    	List<Code> list = service.findShift();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/inputItem")
    public List<Code> inputItem(Model model) {
    	List<Code> list = service.findInputItem();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/model")
    public List<Code> modelItem() {
    	List<Code> list = service.findmodelItem();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/matarial")
    public List<Code> matarialItem() {
    	List<Code> list = service.findmatarial();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/rejectItem")
    public List<Code> rejectItem(Model model) {
    	List<Code> list = service.findrejectItem();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/rejectType")
	public List<Code> rejectType() {
		List<Code> list = service.findRejectType();
		
		return list;
	}
	
	@ResponseBody
	@GetMapping("/storage")
    public List<Code> storage() {
    	List<Code> list = service.findStorage();
		return list;
    }
	

}
