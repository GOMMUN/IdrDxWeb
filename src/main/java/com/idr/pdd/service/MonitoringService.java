package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.Monitoring;
import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.mapper.AnomalyDetectionMapper;
import com.idr.pdd.mapper.DatasetDetailedMapper;
import com.idr.pdd.mapper.MonitoringMapper;

@Service
public class MonitoringService {

	@Autowired
	MonitoringMapper mapper;

	public List<Monitoring> find(Monitoring param) {
		
		List<Monitoring> list=mapper.find(param);
		return mapper.find(param);
	}


}
