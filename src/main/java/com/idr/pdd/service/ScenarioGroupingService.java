package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.CM0901;
import com.idr.pdd.dto.CM0902;
import com.idr.pdd.mapper.DatasetDetailedMapper;
import com.idr.pdd.mapper.ScenarioGroupingMapper;



@Service
public class ScenarioGroupingService {

	@Autowired
	ScenarioGroupingMapper mapper;

	public List<CM0901> findAll1() {
		
		return mapper.findAll1();
	}
	
	public List<CM0902> findAll2() {
		
		return mapper.findAll2();
	}
}
