package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0901;
import com.idr.pdd.dto.CM0902;


@Mapper
public interface ScenarioGroupingMapper {

	List<CM0901> findAll1();
	List<CM0902> findAll2(CM0901 param);
	
	int create1(CM0901 param);
	int modify1(CM0901 param);
	int remove1(List<Integer> param);
	
	int create2(CM0902 param);
	int modify2(CM0902 param);
	int remove2(List<Integer> param);
	
	
}
