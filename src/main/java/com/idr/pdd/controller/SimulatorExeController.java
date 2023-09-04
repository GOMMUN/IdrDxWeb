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

import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.service.LineInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simulator/exe")
public class SimulatorExeController {

	@Autowired
	private LineInfoService service;
	
	
	@GetMapping("")
    public String init() {
        return "page/simulatorExe";
    }
	
}