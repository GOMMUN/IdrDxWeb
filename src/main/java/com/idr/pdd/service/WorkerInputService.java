package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.mapper.WorkerInputMapper;

@Service
public class WorkerInputService {

	@Autowired
	WorkerInputMapper mapper;
	
	public List<WorkerInput> findAll(String factoryid, String lineid, String shiftid, String workDate){
		WorkerInput param = new WorkerInput();
		//param.setRulesysid(rulesysid);
		param.setFactoryid(factoryid);
		param.setLineid(lineid);
		param.setShiftid(shiftid);
		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}
	
	
}
