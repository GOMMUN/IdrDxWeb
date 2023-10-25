package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkDailySummary;

@Mapper
public interface WorkDailySummaryMapper {

	List<WorkDailySummary> findAllName(String plant);
	
}