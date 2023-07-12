package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Shift;


@Mapper
public interface FactoryInfoMapper {

	List<Factory> findAll();
	
	int merge(Factory param);
	int remove(List<Factory> param);
}
