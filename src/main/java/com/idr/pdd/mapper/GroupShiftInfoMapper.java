package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.Shift;
import com.idr.pdd.dto.Vendor;
import com.idr.pdd.dto.WorkDailyReport;


@Mapper
public interface GroupShiftInfoMapper {

	List<Shift> findAll();
	int checkCnt(Shift param);
	
	int save(Shift param);
	int remove(List<Shift> param);
}
