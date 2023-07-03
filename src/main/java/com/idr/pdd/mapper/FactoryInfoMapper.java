package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Factory;


@Mapper
public interface FactoryInfoMapper {

	List<Factory> findAll();
	
	
}
