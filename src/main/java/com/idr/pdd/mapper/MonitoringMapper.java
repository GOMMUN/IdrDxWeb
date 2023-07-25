package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.Factory;
import com.idr.pdd.dto.Monitoring;
import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.WorkerInput;
import com.idr.pdd.dto.WorkerManhour;
import com.idr.pdd.dto.WorkerSupport;

@Mapper
public interface MonitoringMapper {


	List<Monitoring> find(Monitoring param);
}