package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.JobExechist;
import com.idr.pdd.dto.JobExechistMaster;
import com.idr.pdd.mapper.DataTraceMapper;


@Service
public class DataTraceService {

	@Autowired
	DataTraceMapper mapper;

	public List<JobExechistMaster> findM() {
		
		return mapper.findM();
	}
	
	public List<JobExechist> find(JobExechistMaster param) {
		
		return mapper.find(param);
	}
			
}