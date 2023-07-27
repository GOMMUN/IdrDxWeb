package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Shift;



@Mapper
public interface DatasetDetailedMapper {

	List<CM0801> findAll();
	
	int create(CM0801 param);
	int modify(CM0801 param);
	int remove(List<Integer> param);
}
