package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.mapper.WorkerInputMapper;
import com.idr.pdd.mapper.WorkerManhourMapper;

@Service
public class WorkerManhourService {

	@Autowired
	WorkerManhourMapper mapper;
	
	public List<WorkerManhour> findAll(String factoryid, String lineid, String shiftid, String workDate){
		WorkerManhour param = new WorkerManhour();
		//param.setRulesysid(rulesysid);
		param.setFactoryid(factoryid);
		param.setLineid(lineid);
		param.setShiftid(shiftid);
		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}
}
