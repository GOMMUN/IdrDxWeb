package com.idr.pdd.service;

import java.util.ArrayList;
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

	

	public Monitoring planPM(Monitoring param) {
		// TODO Auto-generated method stub
		return mapper.planAM(param);
	}

	public Monitoring planAM(Monitoring param) {
		
		return mapper.planPM(param);
	}

	public Monitoring rejectper(Monitoring param) {
		// TODO Auto-generated method stub
		return mapper.rejectper(param);
	}

	public String uptime(Monitoring param) {
		
		try {
			double downtimeValue = Double.parseDouble(mapper.downtime(param));
			double uptimeValue = Double.parseDouble(mapper.uptime(param));
			
			
			// 백분율을 계산합니다.
			double percentage = (uptimeValue / (uptimeValue + downtimeValue)) * 100;
			return String.valueOf(percentage);
		}catch(Exception e) {
			return null;
		}
		
	}

}
