package com.idr.pdd.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.CM0701;
import com.idr.pdd.service.DvcDatasetModelingService;
import com.idr.pdd.service.ModelVehicleInfoService;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("dvcmodel")
public class DvcDatasetModelingController {

	@Autowired
	private DvcDatasetModelingService service;
	
	@GetMapping("")
    public String init() {
        return "page/dvcDatasetModeling";
    }
	
	@ResponseBody
	@GetMapping("/find")
    public List<CM0701> find() {
		List<CM0701> list = service.findAll();
		return list;
    }

}
