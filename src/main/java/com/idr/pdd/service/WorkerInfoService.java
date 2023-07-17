package com.idr.pdd.service; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkerInfo;
import com.idr.pdd.mapper.WorkerInfoMapper;

@Service
public class WorkerInfoService {

	@Autowired
	WorkerInfoMapper  mapper;

	public List<WorkerInfo> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(WorkerInfo param) {	
		return mapper.save(param);
	}
	
	public int remove(List<WorkerInfo> param) {
		return mapper.remove(param);
	}	
}
