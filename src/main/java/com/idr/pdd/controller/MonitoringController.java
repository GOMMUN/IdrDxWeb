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

import com.idr.pdd.dto.AlarmHistoryReport;
import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.Monitoring;
import com.idr.pdd.service.MonitoringService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/monitoring")
public class MonitoringController {
	
	@Autowired
	MonitoringService service;
	
	@GetMapping("")
    public String init() {
        return "page/monitoring";
    }
	
	@ResponseBody
	@PostMapping("/planPM")
    public Monitoring planPM(@RequestBody Monitoring param) {
		return service.planPM(param);
    }
	
	@ResponseBody
	@PostMapping("/planAM")
    public Monitoring planAM(@RequestBody Monitoring param) {
		
		return service.planAM(param);
    }
	
	@ResponseBody
	@PostMapping("/rejectper")
    public Monitoring rejectper(@RequestBody Monitoring param) {

		return service.rejectper(param);
    }
	
	@ResponseBody
	@PostMapping("/uptime")
    public String uptime(@RequestBody Monitoring param) {

		return service.uptime(param);
    }
	

	@ResponseBody
	@PostMapping("/deliveryComplianceRate")
    public Monitoring deliveryComplianceRate(@RequestBody Monitoring param) {

		return service.deliveryComplianceRate(param);
    }
	
	@ResponseBody
	@PostMapping("/rejectRate")
    public Monitoring rejectRate(@RequestBody Monitoring param) {

		return service.rejectRate(param);
    }


}
