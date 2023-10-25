package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkDailySummary;
import com.idr.pdd.service.WorkDailySummaryService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/workDailySummary")
public class WorkDailySummaryController {
	
	private static String plant = null;

	@Autowired
	private WorkDailySummaryService service;
	
	@GetMapping("")
    public String init(HttpServletRequest request) {
		plant = request.getAttribute("plant").toString();
        return "page/workDailySummary";
    }
	
	@ResponseBody
	@GetMapping("/findName")
	public List<WorkDailySummary> findName() {
		
		List<WorkDailySummary> list = service.findAllName(plant);
		return list;
    }

}