package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0901;
import com.idr.pdd.dto.CM0902;


@Mapper
public interface ScenarioGroupingMapper {

	List<CM0901> findAll1();
	List<CM0902> findAll2(CM0901 param);
	
	
}
