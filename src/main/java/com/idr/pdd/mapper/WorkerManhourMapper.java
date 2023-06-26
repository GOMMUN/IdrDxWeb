package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;

@Mapper
public interface WorkerManhourMapper {

	List<WorkerManhour> findAll(WorkerManhour param);
	WorkerManhour find();
}
