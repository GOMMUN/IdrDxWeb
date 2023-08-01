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

import com.idr.pdd.dto.JobExechist;
import com.idr.pdd.dto.JobExechistMaster;
import com.idr.pdd.service.DataTraceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("datatrace")
public class DataTraceController {

	@Autowired
	private DataTraceService service;
	
	@GetMapping("")
    public String init() {
        return "page/dataTrace";
    }
	
	@ResponseBody
	@GetMapping("/findM")
    public List<JobExechistMaster> findM() {
		List<JobExechistMaster> list = service.findM();
		return list;
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<JobExechist> find(JobExechistMaster param) {
		List<JobExechist> list = service.find(param);
		return list;
    }

}
