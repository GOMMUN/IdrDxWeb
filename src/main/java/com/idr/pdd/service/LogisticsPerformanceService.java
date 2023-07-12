package com.idr.pdd.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.LogisticsPerformance;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.mapper.FairPerformanceMapper;
import com.idr.pdd.mapper.LogisticsPerformanceMapper;

@Service
public class LogisticsPerformanceService {

	@Autowired
	private LogisticsPerformanceMapper mapper;
	
	public Map<String, Object> find(String search, int offset, int limit){
		
		
		Map<String, Object> result = new HashMap<>();
		
		Integer total = mapper.total(search);
		result.put("total", total);
		
		Map<String, Object> param = new HashMap<>();
		param.put("search", search);
		param.put("offset", offset);
		param.put("limit", limit);
		
		List<LogisticsPerformance> rows = mapper.find(param);
		result.put("rows", rows);
		
		return result;
	}
	
	public int create(LogisticsPerformance param) {
		return mapper.create(param);
	}
}
