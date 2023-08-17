package com.idr.pdd.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.WorkContents;
import com.idr.pdd.dto.FairProd;
import com.idr.pdd.dto.RejectContents;
import com.idr.pdd.dto.Dash;
import com.idr.pdd.mapper.DashMapper;

@Service
public class DashService {

	@Autowired
	DashMapper mapper;

	public List<Dash> findAllPQCD(){
		
		return mapper.findAllPQCD();
	}

	public List<RejectContents> findAllR(String month) {

		RejectContents param = new RejectContents();
		param.setMonth(month);

		return mapper.findAllR(param);
	}

	public List<List<FairProd>> chart1(String factory) {

		List<String> rank = mapper.rank(factory);

		List<String> lineList = new ArrayList<>();
		List<List<FairProd>> finalresult = new ArrayList<>();

		if (factory.equals("LHO")) {
			finalresult.add(mapper.chart1(rank.get(0)));		
		} else {
			if (rank.size() > 4) {
				lineList.add(rank.get(0));
				lineList.add(rank.get(1));
				lineList.add(rank.get(rank.size() - 2));
				lineList.add(rank.get(rank.size() - 1));
				finalresult.add(mapper.chart1(lineList.get(0)));
				finalresult.add(mapper.chart1(lineList.get(1)));
				finalresult.add(mapper.chart1(lineList.get(2)));
				finalresult.add(mapper.chart1(lineList.get(3)));
			} else {
				for (String line : rank) {
					finalresult.add(mapper.chart1(line));
				}
			}
		}

		return finalresult;
	}
	
	public List<Dash> findAllDay(String month){
		
		Dash param = new Dash();
		param.setMonth(month);
		
		return mapper.findAllDay(param);
	}

}