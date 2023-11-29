package com.idr.pdd.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.FairProd;
import com.idr.pdd.service.DashService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/dash")
public class DashController {
	
	private static String plant = null;
	private static String accessToken = null;
	private static String refreshToken = null;

	@Autowired
	private DashService service;
	
	@GetMapping("")
    public String init(HttpServletRequest request) {
		plant = request.getAttribute("plant").toString();
		accessToken = request.getAttribute("accessToken").toString();
		refreshToken = request.getAttribute("refreshToken").toString();
		
//		System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%"+accessToken);
//		System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%"+refreshToken);
		
        return "page/dash";
    }
	
	@ResponseBody
	@GetMapping("/findName")
	public List<FairProd> findName(String plant) {
		
		List<FairProd> list = service.findAllName(plant);
		return list;
    }

	@ResponseBody
	@GetMapping("/findP")
	public List<FairProd> findP(String plant, String material) {
		
		List<FairProd> list = service.findAllP(plant, material);
		return list;

    }
	@ResponseBody
	@GetMapping("/findQ")
	public List<FairProd> findQ(String plant, String material) {
		
		List<FairProd> list = service.findAllQ(plant, material);
		return list;

    }
	@ResponseBody
	@GetMapping("/findC")
	public List<List<FairProd>> findC(String plant, String material) {
		
		return service.findAllC(plant, material);

    }
	@ResponseBody
	@GetMapping("/findD")
	public List<FairProd> findD(String plant, String material) {
		
		List<FairProd> list = service.findAllD(plant, material);
		return list;

    }
	
	@ResponseBody
	@GetMapping("/chart1")
    public List<List<FairProd>> chart1(String plant, String month, String material) {
		
		return service.chart1(plant, month, material);
    }

	@ResponseBody
	@GetMapping("/chart2")
    public List<List<FairProd>> chart2(String plant, String factory, String month) {
		
		return service.chart2(plant, factory, month);
    }
	
	@ResponseBody
	@GetMapping("/chart3")
    public List<FairProd> chart3(String plant, String month, String material) {
		
		List<FairProd> list = service.chart3(plant, month, material);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart4")
    public List<FairProd> chart4(String plant, String month, String material) {
		
		List<FairProd> list = service.chart4(plant, month, material);
		return list;
    }
	
	@ResponseBody
	@GetMapping("/chart5")
    public List<List<FairProd>> chart5(String plant, String month, String material) {
		
		return service.chart5(plant, month, material);
    }
	
	@ResponseBody
	@GetMapping("/chart6")
    public List<FairProd> chart6(String plant, String month, String material) {
		
		List<FairProd> list = service.chart6(plant, month, material);
		return list;
    }	
	
	@ResponseBody
	@GetMapping("/chart7")
    public Integer[] chart7() throws Exception {
		
		Integer[] AlarmCnt = service.chart7(accessToken,refreshToken);
		return AlarmCnt;
    }
	
	@ResponseBody
	@GetMapping("/chart8")
    public String chart8(String month) throws Exception {
		
		String wordCloud = service.chart8(month, accessToken,refreshToken);
		return wordCloud;
    }
	
	@ResponseBody
	@GetMapping("/chart9")
    public ArrayList<JSONObject> chart9(String month) throws Exception{
		
		return service.chart9(month, accessToken, refreshToken);
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