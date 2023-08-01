package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.JobExechist;
import com.idr.pdd.dto.JobExechistMaster;



@Mapper
public interface DataTraceMapper {

	List<JobExechistMaster> findM();
	List<JobExechist> find(JobExechistMaster param);
	
}