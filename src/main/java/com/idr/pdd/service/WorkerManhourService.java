package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.mapper.WorkerManhourMapper;

@Service
public class WorkerManhourService {

	@Autowired
	WorkerManhourMapper mapper;
	
	public List<WorkerManhour> findAll(
			int workDailySeq
			//String factoryid, String lineid, String shiftid, String workDate
			){
		WorkerManhour param = new WorkerManhour();
		param.setWorkdailySeq(workDailySeq);
//		param.setFactoryid(factoryid);
//		param.setLineid(lineid);
//		param.setShiftid(shiftid);
//		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}
	
	public int save(WorkerManhour param) {
		return mapper.create(param);
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}

	public int modify(WorkerManhour param) {
		// TODO Auto-generated method stub
		return mapper.modify(param);
	}
}
