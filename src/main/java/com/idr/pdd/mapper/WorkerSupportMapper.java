package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;

@Mapper
public interface WorkerSupportMapper {

	List<WorkerSupport> findAll(WorkerSupport param);
	WorkerSupport find();
}
