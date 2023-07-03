package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.WorkDailyReport;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;

@Mapper
public interface WorkerManhourMapper {

	List<WorkerManhour> findAll(WorkerManhour param);
	WorkerManhour find();
	
	int create(WorkerManhour param);
	int modify(WorkerManhour param);
	int remove(List<Integer> param);
}
