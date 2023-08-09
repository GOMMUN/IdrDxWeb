package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.mapper.WorkContentsMapper;

@Service
public class DashService {

	@Autowired
	WorkContentsMapper mapper;
	
	public List<WorkContents> findAll(
			int workDailySeq
			){
		WorkContents param = new WorkContents();
		param.setWorkdailySeq(workDailySeq);
		
		return mapper.findAll(param);
	}


}