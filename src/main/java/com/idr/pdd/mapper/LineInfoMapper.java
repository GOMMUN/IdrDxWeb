package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface LineInfoMapper {

	List<Location> findAll();
	
	int create(Location param);
	int modify(Location param);
	int remove(List<Integer> param);
	int validationcheck(Location param);
}
