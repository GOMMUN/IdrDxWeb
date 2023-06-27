package com.idr.pdd.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.WorkDailyReport;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/person")
public class PersonController {

	@ResponseBody
	@GetMapping("/find")
    public List<WorkDailyReport> find() {
		//List<WorkDailyReport> list = service.findAll();
		return null;
    }
}
