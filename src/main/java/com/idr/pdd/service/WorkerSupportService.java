package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;
import com.idr.pdd.mapper.WorkerInputMapper;
import com.idr.pdd.mapper.WorkerManhourMapper;
import com.idr.pdd.mapper.WorkerSupportMapper;

@Service
public class WorkerSupportService {

	@Autowired
	WorkerSupportMapper mapper;
	
	public List<WorkerSupport> findAll(String factoryid, String lineid, String shiftid, String workDate){
		WorkerSupport param = new WorkerSupport();
		//param.setRulesysid(rulesysid);
		param.setFactoryid(factoryid);
		param.setLineid(lineid);
		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}
}
