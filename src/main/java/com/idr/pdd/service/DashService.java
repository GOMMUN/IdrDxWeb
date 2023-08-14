package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.mapper.DashMapper;

@Service
public class DashService {

	@Autowired
	DashMapper mapper;
	
	public List<WorkContents> findAllW(){
		
		return mapper.findAllW();
	}

	public List<RejectContents> findAllR(String month){
		
		RejectContents param = new RejectContents();
		param.setMonth(month);
		
		return mapper.findAllR(param);
	}

}