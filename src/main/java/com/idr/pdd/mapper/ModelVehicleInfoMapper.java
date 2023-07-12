package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0501;



@Mapper
public interface ModelVehicleInfoMapper {

	List<CM0501> findAll();
	
	int merge(CM0501 param);
	int remove(List<CM0501> param);
}
