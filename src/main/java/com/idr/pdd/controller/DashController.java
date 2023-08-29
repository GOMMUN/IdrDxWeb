package com.idr.pdd.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.FairProd;
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
	@GetMapping("/findName")
	public List<FairProd> findName(String factory) {
		
		List<FairProd> list = service.findAllName(factory);
		return list;
    }

	@ResponseBody
	@GetMapping("/findPQCD")
	public List<FairProd> findPQCD(String factory) {
		
		List<FairProd> list = service.findAllPQCD(factory);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart1")
    public List<List<FairProd>> chart1(String factory, String month) {
		
		return service.chart125(factory, month);
    }

	@ResponseBody
	@GetMapping("/chart2")
    public List<List<FairProd>> chart2(String factory, String month) {
		
		return service.chart125(factory, month);
    }
	
	@ResponseBody
	@GetMapping("/chart3")
    public List<FairProd> chart3(String factory, String month) {
		
		List<FairProd> list = service.chart3(factory, month);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart4")
    public List<FairProd> chart4(String factory, String month) {
		
		List<FairProd> list = service.chart4(factory, month);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart5")
    public List<List<FairProd>> chart5(String factory, String month) {
		
		return service.chart125(factory, month);
    }
	
	@ResponseBody
	@GetMapping("/chart6")
    public List<FairProd> chart6(String factory, String month) {
		
		List<FairProd> list = service.chart6(factory, month);
		return list;
    }	
	
	@ResponseBody
	@GetMapping("/chart8")
    public List<FairProd> chart8(String month) {
		
		List<FairProd> list = service.chart8(month);
		return list;
    }		
	
	@ResponseBody
	@GetMapping("/findAlarm")
    public String[] find1Alarm() {
		
		String cnt1 = service.find1Alarm();
		String cnt2 = service.find2Alarm();
		String cnt3 = service.find3Alarm();
		
		String cnt4 = service.find1AlarmConfirm();
		String cnt5 = service.find2AlarmConfirm();
		String cnt6 = service.find3AlarmConfirm();
		
		String[] list = new String[6];
		
		list[0] = cnt1;
		list[1] = cnt2;
		list[2] = cnt3;
		list[3] = cnt4;
		list[4] = cnt5;
		list[5] = cnt6;				
		
		return list;
    }
	

	@ResponseBody
	@GetMapping("/findDailyAlarm")
	public List<FairProd> findDailyAlarm() {
		
		List<FairProd> list = service.findAllDailyAlarm();
		return list;
    }
}