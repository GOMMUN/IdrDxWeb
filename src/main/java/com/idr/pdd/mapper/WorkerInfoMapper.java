package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0401;


@Mapper
public interface WorkerInfoMapper {

	List<CM0401> findAll();
	
	
}
