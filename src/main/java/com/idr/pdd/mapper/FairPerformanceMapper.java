package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.WorkDailyReport;

@Mapper
public interface FairPerformanceMapper {

	List<FairPerformance> find(Map<String, Object> param);
	Integer total(String search);
	int create(FairPerformance param);
}
