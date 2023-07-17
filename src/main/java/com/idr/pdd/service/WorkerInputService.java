package com.idr.pdd.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.common.Tid;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.mapper.WorkerInputMapper;

@Service
public class WorkerInputService {

	@Autowired
	WorkerInputMapper mapper;
	
	public List<WorkerInput> findAll(
			int workDailySeq
			//String factoryid, String lineid, String shiftid, String workDate
			){
		
		WorkerInput param = new WorkerInput();
		param.setWorkdailySeq(workDailySeq);
//		param.setFactoryid(factoryid);
//		param.setLineid(lineid);
//		param.setShiftid(shiftid);
//		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}

	public int save(WorkerInput param) {
		param.setTid(Tid.generate());
		return mapper.create(param);

	}

	public int modify(WorkerInput param) {
		// TODO Auto-generated method stub
		return mapper.modify(param);
	}


	public int remove(List<Integer> param) {
		
		return mapper.remove(param);
	}
	
	
}
