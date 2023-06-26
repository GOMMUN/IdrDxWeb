package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.WorkerSupport;
import com.idr.pdd.service.WorkContentsService;
import com.idr.pdd.service.WorkerSupportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/workContents")
public class WorkContentsController {
	
	@Autowired
	private WorkContentsService service;

	@ResponseBody
	@GetMapping("/find")
    public List<WorkContents> find(
    		String factoryid, String lineid, String shiftid, String workDate) {
		
		List<WorkContents> list = service.findAll(factoryid, lineid, shiftid, workDate);
		return list;
    }
}
