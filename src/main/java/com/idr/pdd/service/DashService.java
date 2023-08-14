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
	
	public List<WorkContents> findAllTo(){
		
		return mapper.findAllTo();
	}
	
	public List<WorkContents> findAllYe(){
		
		return mapper.findAllYe();
	}

	public List<RejectContents> findAllSpe(String month){
		
		RejectContents param = new RejectContents();
		param.setMonth(month);
		
		return mapper.findAllSpe(param);
	}
	
	public List<RejectContents> findAllFre(){
		
		return mapper.findAllFre();
	}
}