package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.ModelNM;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.service.CodeService;
import com.idr.pdd.service.WorkContentsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/dash")
public class DashController {
	
	@GetMapping("")
    public String init() {
        return "page/dash";
    }

	@Autowired
	private WorkContentsService service;

	@ResponseBody
	@GetMapping("/find")
    public List<WorkContents> find(
    		int workDailySeq
    		) {
		
		List<WorkContents> list = service.findAll(workDailySeq);
		return list;
    }
}
