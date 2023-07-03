package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;



import com.idr.pdd.dto.CM0801;



@Mapper
public interface DatasetDetailedMapper {

	List<CM0801 > findAll();
	
}
