package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.LogisticsPerformance;
import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.WorkerPerformance;

@Mapper
public interface WorkerPerformanceMapper {

	List<WorkerPerformance> find(Map<String, Object> param);
	Integer total(String search);
	int create(WorkerPerformance param);
}
