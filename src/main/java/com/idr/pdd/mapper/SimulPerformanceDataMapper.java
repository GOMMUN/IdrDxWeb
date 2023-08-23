package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.Code;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.LeadTime;
import com.idr.pdd.dto.Location;
import com.idr.pdd.dto.LogisticsInfo;
import com.idr.pdd.dto.ModelNM;
import com.idr.pdd.dto.PerByProductPlan;
import com.idr.pdd.dto.performanceByProcess;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;

@Mapper
public interface SimulPerformanceDataMapper {


	List<PerByProductPlan> productplanfind(String start, String end);

	//Map<String, Integer> sundaycount(String start, String end);

	List<performanceByProcess > performanceByProcess(String start, String end);
	
	List<LeadTime> leadtime(String start,String end);
	
}
