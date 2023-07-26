package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.LotInfo;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface LotInfoMapper {

	List<LotInfo> findAll();
	
	int create(LotInfo param);
	int modify(LotInfo param);
	int remove(List<Integer> param);
}