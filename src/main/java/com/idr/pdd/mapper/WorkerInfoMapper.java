package com.idr.pdd.mapper; 

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkerInfo;


@Mapper
public interface WorkerInfoMapper {

	List<WorkerInfo> findAll();
	
	int create(WorkerInfo param);
	int modify(WorkerInfo param);
	int remove(List<Integer> param);
}
