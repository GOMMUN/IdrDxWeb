package com.idr.pdd.mapper; 

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkerInfo;


@Mapper
public interface WorkerInfoMapper {

	List<WorkerInfo> findAll();
	
	int save(WorkerInfo param);
	int remove(List<WorkerInfo> param);
}
