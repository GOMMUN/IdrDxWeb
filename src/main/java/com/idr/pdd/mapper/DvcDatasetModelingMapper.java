package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.idr.pdd.dto.CM0701;



@Mapper
public interface DvcDatasetModelingMapper {

	List<CM0701> findAll();
	
	
}
