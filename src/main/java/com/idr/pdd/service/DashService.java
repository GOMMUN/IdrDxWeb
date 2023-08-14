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
	
	public List<WorkContents> findAll1(){
		
		return mapper.findAll1();
	}
	
	public List<WorkContents> findAll4(){
		
		return mapper.findAll4();
	}

	public List<RejectContents> findAll2(String month){
		
		RejectContents param = new RejectContents();
		param.setMonth(month);
		
		return mapper.findAll2(param);
	}
	
	public List<RejectContents> findAll3(){
		
		return mapper.findAll3();
	}
}