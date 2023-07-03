package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.service.WorkDailyReportService;
import com.idr.pdd.service.WorkerInputService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/workerInput")
public class WorkerInputController {
	
	@Autowired
	private WorkerInputService service;

	@ResponseBody
	@GetMapping("/find")
    public List<WorkerInput> find(
    		int workDailySeq
    		//String factoryid, String lineid, String shiftid, String workDate
    		) {
		
		//List<WorkerInput> list = service.findAll(factoryid, lineid, shiftid, workDate);
		List<WorkerInput> list = service.findAll(workDailySeq);
		return list;
    }
}
