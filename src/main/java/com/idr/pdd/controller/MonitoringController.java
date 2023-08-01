package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	@GetMapping("/findproduct")
    public List<Monitoring> findproduct(Monitoring param) {
		return service.findproduct(param);
    }
	
	@ResponseBody
	@GetMapping("/findstorage")
    public Monitoring findstorage(Monitoring param) {
		
		return service.findstorage(param);
    }
	
	@ResponseBody
	@GetMapping("/findreject")
    public Monitoring findreject(Monitoring param) {
		return service.findreject(param);
    }
	
	@ResponseBody
	@GetMapping("/findnotoperate")
    public List<Monitoring> findnotoperate(Monitoring param) {
		
		return service.findnotoperate(param);
    }
	


}
