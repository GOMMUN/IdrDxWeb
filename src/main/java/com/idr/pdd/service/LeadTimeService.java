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

	public List<LeadTime> find(String start, String end) {

		// Map<String,Integer> count=mapper.sundaycount(start,end);

		List<LeadTime> list = mapper.leadtime(start, end);
		/*
		for (LeadTime p : list) {

			int days = Integer.parseInt(p.getLeadTime()) / (24 * 60 * 60);
			int hours = (Integer.parseInt(p.getLeadTime()) % (24 * 60 * 60)) / 3600;
			int minutes = (Integer.parseInt(p.getLeadTime()) % 3600) / 60;
			int seconds = Integer.parseInt(p.getLeadTime()) % 60;
			String result = String.valueOf(days + "DAY" + " "+hours + ":" + minutes + ":" + seconds );
			p.setLeadTime(result);

		}
*/
		return list;
	}

}