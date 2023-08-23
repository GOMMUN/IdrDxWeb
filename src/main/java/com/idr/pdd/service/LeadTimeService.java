package com.idr.pdd.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.LeadTime;
import com.idr.pdd.dto.LogisticsInfo;
import com.idr.pdd.dto.PerByProductPlan;
import com.idr.pdd.mapper.LogisticsInfoMapper;
import com.idr.pdd.mapper.SimulPerformanceDataMapper;

@Service
public class LeadTimeService {

	@Autowired
	SimulPerformanceDataMapper mapper;

	public List<LeadTime> find(String start,String end) {

		//Map<String,Integer> count=mapper.sundaycount(start,end);
		
		List<LeadTime> list=mapper.leadtime(start, end);

		for(LeadTime p:list) {
			
			if(Integer.parseInt(p.getLeadTime())>0)
			{
				int days = Integer.parseInt(p.getLeadTime()) / (24 * 60 * 60);
		        int hours = (Integer.parseInt(p.getLeadTime()) % (24 * 60 * 60)) / 3600;
		        int minutes = (Integer.parseInt(p.getLeadTime()) % 3600) / 60;
		        int seconds = Integer.parseInt(p.getLeadTime()) % 60;
		        String result=String.valueOf(days+"일"+hours+"시간"+minutes+"분"+seconds+"초");
		        p.setLeadTime(result);
		        
		        days = Integer.parseInt(p.getLossTime()) / (24 * 60 * 60);
		        hours = (Integer.parseInt(p.getLossTime()) % (24 * 60 * 60)) / 3600;
		        minutes = (Integer.parseInt(p.getLossTime()) % 3600) / 60;
		        seconds = Integer.parseInt(p.getLossTime()) % 60;
		        result=String.valueOf("+"+days+"일"+hours+"시간"+minutes+"분"+seconds+"초");
		        p.setLossTime(result);
		        
			}else if(Integer.parseInt(p.getLeadTime())<0) {
				
				int days = Integer.parseInt(p.getLeadTime()) / (24 * 60 * 60);
		        int hours = (Integer.parseInt(p.getLeadTime()) % (24 * 60 * 60)) / 3600;
		        int minutes = (Integer.parseInt(p.getLeadTime()) % 3600) / 60;
		        int seconds = Integer.parseInt(p.getLeadTime()) % 60;
		        String result=String.valueOf(days+"일"+hours+"시간"+minutes+"분"+seconds+"초");
		        p.setLeadTime(result);
		        
		        days = Integer.parseInt(p.getLossTime()) / (24 * 60 * 60);
		        hours = (Integer.parseInt(p.getLossTime()) % (24 * 60 * 60)) / 3600;
		        minutes = (Integer.parseInt(p.getLossTime()) % 3600) / 60;
		        seconds = Integer.parseInt(p.getLossTime()) % 60;
		        result=String.valueOf("-"+days+"일"+hours+"시간"+minutes+"분"+seconds+"초");
		        p.setLossTime(result);
			}
			
			
		}

		
		return list;
	}
	

	
} 