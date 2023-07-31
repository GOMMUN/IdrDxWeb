package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.AnomalyDetection;
import com.idr.pdd.dto.CM0801;
import com.idr.pdd.dto.NotoperateContents;
import com.idr.pdd.mapper.AnomalyDetectionMapper;
import com.idr.pdd.mapper.DatasetDetailedMapper;

@Service
public class AnomalyDetectionService {

	@Autowired
	AnomalyDetectionMapper mapper;

	public int modify(AnomalyDetection  param) {
		
		if(mapper.modify(param)==1&&mapper.modify2(param)==1)
		{
			return 1;
		}
		else {
			return -1;
		}
		
	}

	public int modify2(AnomalyDetection  param) {
		return mapper.modify2(param);
	}
	
	public List<AnomalyDetection> find() {
		return mapper.find();
	}
}
