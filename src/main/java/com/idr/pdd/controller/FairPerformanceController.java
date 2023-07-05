package com.idr.pdd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.service.FairPerformanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simullator/fairPerformance")
public class FairPerformanceController {
	
	@Autowired
	private FairPerformanceService service;
	
	@GetMapping("")
    public String init() {
        return "page/fairPerformance";
    }

	@ResponseBody
	@GetMapping("/find")
    public Map<String, Object> find(String search, int offset, int limit) {
		return service.find(search, offset, limit);
    }
}
