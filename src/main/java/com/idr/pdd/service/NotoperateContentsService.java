package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;
import com.idr.pdd.mapper.NotoperateContentsMapper;
import com.idr.pdd.mapper.RejectContentsMapper;
import com.idr.pdd.mapper.WorkContentsMapper;
import com.idr.pdd.mapper.WorkerInputMapper;
import com.idr.pdd.mapper.WorkerManhourMapper;
import com.idr.pdd.mapper.WorkerSupportMapper;

@Service
public class NotoperateContentsService {

	@Autowired
	NotoperateContentsMapper mapper;
	
	public List<NotoperateContents> findAll(
			int workDailySeq
			//String factoryid, String lineid, String shiftid, String workDate
			){
		NotoperateContents param = new NotoperateContents();
		param.setWorkdailySeq(workDailySeq);
//		param.setFactoryid(factoryid);
//		param.setLineid(lineid);
//		param.setShiftid(shiftid);
//		param.setWorkDate(workDate);
		
		return mapper.findAll(param);
	}
}
