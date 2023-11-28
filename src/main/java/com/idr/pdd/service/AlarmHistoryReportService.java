package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.AlarmHistoryReport;
import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.mapper.AlarmHistoryReportMapper;
import com.idr.pdd.mapper.AnomalyDetectionMapper;
import com.idr.pdd.mapper.DatasetDetailedMapper;

@Service
public class AlarmHistoryReportService {

	@Autowired
	AlarmHistoryReportMapper  mapper;

	

	public List<AlarmHistoryReport> planfind(AlarmHistoryReport param) {

		return mapper.planfind(param);
	}



	public List<AlarmHistoryReport> quality(AlarmHistoryReport param) {
		
		return mapper.quality(param);
	}



	public List<AlarmHistoryReport> facility(AlarmHistoryReport param) {
		
		return mapper.facility(param);
	}
}
