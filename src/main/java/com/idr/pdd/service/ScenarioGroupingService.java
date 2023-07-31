package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.idr.pdd.dto.CM0901;
import com.idr.pdd.dto.CM0902;
import com.idr.pdd.mapper.ScenarioGroupingMapper;



@Service
public class ScenarioGroupingService {

	@Autowired
	ScenarioGroupingMapper mapper;

	public List<CM0901> findAll1() {
		
		return mapper.findAll1();
	}
	
	public List<CM0902> findAll2(CM0901 param) {
		
		return mapper.findAll2(param);
	}
	
	public int save1(CM0901 param) {
		if(param.getDataseq() == 0) {
			return mapper.create1(param);
		}else {
			return mapper.modify1(param);
		}
	}
	
	public int remove1(List<Integer> param) {
		return mapper.remove1(param);
	}
	
	public int save2(CM0902 param) {
		if(param.getDataseq() == 0) {
			return mapper.create2(param);
		}else {
			return mapper.modify2(param);
		}
	}
	
	public int remove2(List<Integer> param) {
		return mapper.remove2(param);
	}
}
