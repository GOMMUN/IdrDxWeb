package com.idr.pdd.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Dash;
import com.idr.pdd.dto.FairProd;
import com.idr.pdd.dto.RejectContents;
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
	@Autowired

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
		
		return service.chart1(factory, month);
    }
	
	@ResponseBody
	@GetMapping("/chart6")
    public List<FairProd> chart6(String month) {
		
		List<FairProd> list = service.chart6(month);
		return list;
    }	
	
	@ResponseBody
	@GetMapping("/findAlarm")
    public String[] find1Alarm() {
		
		String cnt1 = service.find1Alarm();
		String cnt2 = service.find2Alarm();
		String cnt3 = service.find3Alarm();
		
		String[] list = new String[4];
		
		list[0] = cnt1;
		list[1] = cnt2;
		list[2] = cnt3;
				
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date now = new Date();
		String strDate = sdf.format(now);
		
		list[3] = strDate;
		
		return list;
    }
	

	@ResponseBody
	@GetMapping("/findDailyAlarm")
	public List<Dash> findDailyAlarm() {
		
		List<Dash> list = service.findAllDailyAlarm();
		return list;
    }
}