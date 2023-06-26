package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.service.WorkDailyReportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/workDailyReport")
public class WorkDailyReportController {
	
	@Autowired
	private WorkDailyReportService service;

	@GetMapping("")
    public String init() {
        return "page/workDailyReport";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<WorkDailyReport> find() {
		List<WorkDailyReport> list = service.findAll();
		return list;
    }
	
	@ResponseBody
	@PostMapping("/create")
    public int create(@RequestBody List<WorkDailyReport> param) {
		return service.save(param);
    }
	
	@ResponseBody
	@PutMapping("/remove")
    public int remove(@RequestBody List<Integer> param) {
		return service.remove(param);
    }
}
