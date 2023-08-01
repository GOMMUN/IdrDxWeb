package com.idr.pdd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.Occur;
import com.idr.pdd.dto.Notice;
import com.idr.pdd.dto.Confirm;
import com.idr.pdd.mapper.AnomalyDetectMapper;


@Service
public class AnomalyDetectService {

	@Autowired
	AnomalyDetectMapper mapper;

	public List<Occur> findO() {
		
		return mapper.findO();
	}
	
	public List<Notice> findN() {
		
		return mapper.findN();
	}
	
	public List<Confirm> findC() {
		
		return mapper.findC();
	}
			
}