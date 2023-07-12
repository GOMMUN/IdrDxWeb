package com.idr.pdd.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.LogisticsPerformance;
import com.idr.pdd.dto.ProductionPlanning;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.WorkerPerformance;
import com.idr.pdd.mapper.FairPerformanceMapper;
import com.idr.pdd.mapper.LogisticsPerformanceMapper;
import com.idr.pdd.mapper.ProductionPlanningMapper;
import com.idr.pdd.mapper.WorkerPerformanceMapper;

@Service
public class ProductionPlanningService {

	@Autowired
	private ProductionPlanningMapper mapper;
	
	public Map<String, Object> find(String search, int offset, int limit){
		
		
		Map<String, Object> result = new HashMap<>();
		
		Integer total = mapper.total(search);
		result.put("total", total);
		
		Map<String, Object> param = new HashMap<>();
		param.put("search", search);
		param.put("offset", offset);
		param.put("limit", limit);
		
		List<ProductionPlanning> rows = mapper.find(param);
		result.put("rows", rows);
		
		return result;
	}
	
	public int create(ProductionPlanning param) {
		return mapper.create(param);
	}
}
