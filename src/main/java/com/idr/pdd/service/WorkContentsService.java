package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.mapper.WorkContentsMapper;

@Service
public class WorkContentsService {

	@Autowired
	WorkContentsMapper mapper;
	
	public List<WorkContents> findAll(
			int workDailySeq
			//String factoryid, String lineid, String shiftid, String workDate
			){
		WorkContents param = new WorkContents();
		param.setWorkdailySeq(workDailySeq);
//		param.setFactoryid(factoryid);
//		param.setLineid(lineid);
//		param.setShiftid(shiftid);
//		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}


	public int save(WorkContents param) {
		return mapper.create(param);
	}


	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}


	public int modify(WorkContents param) {
		return mapper.modify(param);
	}
}
