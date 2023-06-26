package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.service.WorkerManhourService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/workerManhour")
public class WorkerManhourController {
	
	@Autowired
	private WorkerManhourService service;

	@ResponseBody
	@GetMapping("/find")
    public List<WorkerManhour> find(
    		String factoryid, String lineid, String shiftid, String workDate) {
		
		List<WorkerManhour> list = service.findAll(factoryid, lineid, shiftid, workDate);
		return list;
    }
}
