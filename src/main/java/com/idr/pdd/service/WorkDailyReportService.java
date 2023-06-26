package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.mapper.WorkDailyReportMapper;

@Service
public class WorkDailyReportService {

	@Autowired
	WorkDailyReportMapper mapper;
	
	public List<WorkDailyReport> findAll(){
		return mapper.findAll();
	}
	
	public int save(List<WorkDailyReport> param) {
		
		if(param.get(0).getDataseq() == 0) {
			return mapper.create(param);
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}
}
