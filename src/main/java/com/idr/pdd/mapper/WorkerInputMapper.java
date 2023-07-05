package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkerInput;

@Mapper
public interface WorkerInputMapper {

	List<WorkerInput> findAll(WorkerInput param);
	WorkerInput find();
	int create(WorkerInput param);
	int remove(List<Integer> param);
	int modify(WorkerInput param);
}
