package com.idr.pdd.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.LogisticsInfo;
import com.idr.pdd.dto.PerByProductPlan;
import com.idr.pdd.mapper.LogisticsInfoMapper;
import com.idr.pdd.mapper.SimulPerformanceDataMapper;

@Service
public class PerByProductPlanService {

	@Autowired
	SimulPerformanceDataMapper mapper;

	public List<PerByProductPlan> find(String start,String end) {

		//Map<String,Integer> count=mapper.sundaycount(start,end);
		
		List<PerByProductPlan> list=mapper.productplanfind(start, end);
		
/*
		for(PerByProductPlan p:list) {
			int days = Integer.parseInt(p.getTakenTime()) / (24 * 60 * 60);
	        int hours = (Integer.parseInt(p.getTakenTime()) % (24 * 60 * 60)) / 3600;
	        int minutes = (Integer.parseInt(p.getTakenTime()) % 3600) / 60;
	        int seconds = Integer.parseInt(p.getTakenTime()) % 60;
	        String result=String.valueOf(days+"일"+hours+"시간"+minutes+"분"+seconds+"초");
	        p.setTakenTime(result);
		}
*/
		
		return list;
	}
	

	
} 