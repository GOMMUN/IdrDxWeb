package com.idr.pdd.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.CM0401;
import com.idr.pdd.service.WorkerInfoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("workerinfo")
public class WorkerInfoController {

	@Autowired
	private WorkerInfoService service;
	
	@GetMapping("")
    public String init() {
        return "page/workerinfo";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<CM0401> find() {
		List<CM0401> list = service.findAll();
		return list;
    }

}
