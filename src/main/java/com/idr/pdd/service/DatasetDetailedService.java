package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0801;
import com.idr.pdd.mapper.DatasetDetailedMapper;



@Service
public class DatasetDetailedService {

	@Autowired
	DatasetDetailedMapper mapper;

	public List<CM0801> findAll() {
		
		return mapper.findAll();
	}
}
