package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.common.Tid;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;
import com.idr.pdd.mapper.WorkerInputMapper;
import com.idr.pdd.mapper.WorkerManhourMapper;
import com.idr.pdd.mapper.WorkerSupportMapper;

@Service
public class WorkerSupportService {

	@Autowired
	WorkerSupportMapper mapper;
	
	public List<WorkerSupport> findAll(
			int workDailySeq
			//String factoryid, String lineid, String shiftid, String workDate
			){
		WorkerSupport param = new WorkerSupport();
		param.setWorkdailySeq(workDailySeq);
//		param.setFactoryid(factoryid);
//		param.setLineid(lineid);
//		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}

	public int save(WorkerSupport param) {
		param.setTid(Tid.generate());
		
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
