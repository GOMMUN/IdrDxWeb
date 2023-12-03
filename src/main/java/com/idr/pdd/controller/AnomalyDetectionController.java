package com.idr.pdd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.NelsonruleSetting;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.service.AnomalyDetectionService;
import com.idr.pdd.service.FactoryInfoService;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("anomalydetection")
class AnomalyDetectionController {

	@Autowired
	AnomalyDetectionService  service;
	
	@GetMapping("")
    public String init() {
        return "page/anomalydetection";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<AnomalyDetection> find() {
		return service.find();
    }
	
	@ResponseBody
	@GetMapping("/findN")
    public List<NelsonruleSetting> findN() {
		return service.findN();
    }
	
	@ResponseBody
	@PutMapping("/modify")
    public int modify(@RequestBody Map<String, String>  param) {
		return service.modify(param);
    }
	
}
