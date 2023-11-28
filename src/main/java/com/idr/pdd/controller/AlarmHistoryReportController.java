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
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.Notice;
import com.idr.pdd.dto.AlarmHistoryReport;
import com.idr.pdd.dto.Confirm;
import com.idr.pdd.service.AlarmHistoryReportService;
import com.idr.pdd.service.AnomalyDetectService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("alarmHistoryReport")
public class AlarmHistoryReportController {

	@Autowired
	private AlarmHistoryReportService service;
	
	@GetMapping("")
    public String init() {
        return "page/alarmHistoryReport";
    }
	
	@ResponseBody
	@PostMapping("/planfind")
    public List<AlarmHistoryReport> planfind(@RequestBody AlarmHistoryReport param) {

		return service.planfind(param);
    }
	
	@ResponseBody
	@PostMapping("/quality")
    public List<AlarmHistoryReport> Quality(@RequestBody AlarmHistoryReport param) {

		return service.quality(param);
    }
	
	@ResponseBody
	@PostMapping("/facility")
    public List<AlarmHistoryReport> facility(@RequestBody AlarmHistoryReport param) {

		return service.facility(param);
    }
	
}