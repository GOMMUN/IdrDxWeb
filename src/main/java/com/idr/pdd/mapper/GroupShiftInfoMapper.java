package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.Shift;


@Mapper
public interface GroupShiftInfoMapper {

	List<Shift> findAll();
	
	
}
