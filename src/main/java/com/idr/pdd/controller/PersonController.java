package com.idr.pdd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.idr.pdd.dto.Person;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.service.DatasetDetailedService;
import com.idr.pdd.service.PersonService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/person")
public class PersonController {


	@Autowired
	private PersonService service;
	
	@ResponseBody
	@GetMapping("/find")
    public List<Person> find(Person param) {
		List<Person> list = service.findAll(param);
		return list;
    }
}
