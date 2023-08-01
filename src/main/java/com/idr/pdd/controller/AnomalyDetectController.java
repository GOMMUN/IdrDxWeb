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

import com.idr.pdd.dto.Occur;
import com.idr.pdd.dto.Notice;
import com.idr.pdd.dto.Confirm;
import com.idr.pdd.service.AnomalyDetectService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("anomalydetect")
public class AnomalyDetectController {

	@Autowired
	private AnomalyDetectService service;
	
	@GetMapping("")
    public String init() {
        return "page/anomalyDetect";
    }
	
	@ResponseBody
	@GetMapping("/findO")
    public List<Occur> findO() {
		List<Occur> list = service.findO();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/findN")
    public List<Notice> findN() {
		List<Notice> list = service.findN();
		return list;
    }

	@ResponseBody
	@GetMapping("/findC")
    public List<Confirm> findC() {
		List<Confirm> list = service.findC();
		return list;
    }
}