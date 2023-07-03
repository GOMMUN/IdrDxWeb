package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.WorkerSupport;
import com.idr.pdd.service.NotoperateContentsService;
import com.idr.pdd.service.RejectContentsService;
import com.idr.pdd.service.WorkContentsService;
import com.idr.pdd.service.WorkerSupportService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/notoperateContents")
public class NotoperateContentsController {
	
	@Autowired
	private NotoperateContentsService service;

	@ResponseBody
	@GetMapping("/find")
    public List<NotoperateContents> find(
    		int workDailySeq
    		//String factoryid, String lineid, String shiftid, String workDate
    		) {
		
		List<NotoperateContents> list = service.findAll(workDailySeq);
		return list;
    }
}
