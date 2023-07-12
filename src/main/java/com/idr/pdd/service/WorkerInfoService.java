package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.CM0401;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Shift;
import com.idr.pdd.mapper.FactoryInfoMapper;
import com.idr.pdd.mapper.GroupShiftInfoMapper;
import com.idr.pdd.mapper.WorkerInfoMapper;

@Service
public class WorkerInfoService {

	@Autowired
	WorkerInfoMapper  mapper;

	public List<CM0401> findAll() {
		
		return mapper.findAll();
	}
	
	public int save(CM0401 param) {	
		return mapper.merge(param);
	}
	
	public int remove(List<CM0401> param) {
		return mapper.remove(param);
	}	
}
