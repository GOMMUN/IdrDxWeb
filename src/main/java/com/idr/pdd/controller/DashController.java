package com.idr.pdd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.FairProd;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.dto.Dash;
import com.idr.pdd.service.DashService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/dash")
public class DashController {
	
	@GetMapping("")
    public String init() {
        return "page/dash";
    }

	@Autowired
	private DashService service;

	@ResponseBody
	@GetMapping("/findPQCD")
	public List<Dash> findPQCD() {
		
		List<Dash> list = service.findAllPQCD();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findR")
    public List<RejectContents> findR(String month) {
		
		List<RejectContents> list = service.findAllR(month);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart1")
    public List<List<FairProd>> chart1(String factory, String month) {
		
		return service.chart1(factory, month);
    }

	@ResponseBody
	@GetMapping("/chart2")
    public List<List<FairProd>> chart2(String factory, String month) {
		
		return service.chart1(factory, month);
    }
	
	@ResponseBody
	@GetMapping("/chart5")
    public List<List<FairProd>> chart5(String factory, String month) {
		
		return service.chart5(factory, month);
    }
}