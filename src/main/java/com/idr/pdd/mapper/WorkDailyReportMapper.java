package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkDailyReport;

@Mapper
public interface WorkDailyReportMapper {

	List<WorkDailyReport> findAll();
	WorkDailyReport find();
	
	int create(WorkDailyReport param);
	int modify(WorkDailyReport param);
	int remove(List<Integer> param);
	int validationcheck(WorkDailyReport param);
}
