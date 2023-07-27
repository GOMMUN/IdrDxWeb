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
	
	public int save(CM0801 param) {
		if(param.getDataseq() == 0) {
			return mapper.create(param);
		} else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}		
}
