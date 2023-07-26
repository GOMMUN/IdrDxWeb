package com.idr.pdd.service; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Shift;
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
		if(param.getDataseq() == 0) {
			return mapper.create(param);
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}	
}
