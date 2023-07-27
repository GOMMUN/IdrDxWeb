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
	
	public List<WorkDailyReport> find(String plant){
		return mapper.find(plant);
	}
	
	public int save(WorkDailyReport param) {
		
		if(param.getDataseq() == 0) {
			System.out.println(mapper.validationcheck(param));
			
			if(mapper.validationcheck(param)>0){
				return -1;
			}
			else{
				return mapper.create(param);
			}
						
		}else {
			return mapper.modify(param);
		}
	}
	
	public int remove(List<Integer> param) {
		return mapper.remove(param);
	}
}
