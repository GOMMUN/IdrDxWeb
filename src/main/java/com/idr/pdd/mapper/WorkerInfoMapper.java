package com.idr.pdd.mapper; 

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.CM0401;
import com.idr.pdd.dto.Shift;


@Mapper
public interface WorkerInfoMapper {

	List<CM0401> findAll();
	
	int merge(CM0401 param);
	int remove(List<CM0401> param);
}
