package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.LogisticsInfo;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface LogisticsInfoMapper {

	List<LogisticsInfo> findAll();
	
	int create(LogisticsInfo param);
	int modify(LogisticsInfo param);
	int remove(List<Integer> param);
}