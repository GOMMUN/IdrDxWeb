package com.idr.pdd.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.idr.pdd.dto.FairProd;
import com.idr.pdd.mapper.DashMapper;

@Service
public class DashService {

	@Autowired
	DashMapper mapper;
	
	public List<FairProd> findAllName(String factory){
		
		return mapper.findAllName(factory);
	}

	public List<FairProd> findAllPQCD(String factory){
		
		return mapper.findAllPQCD(factory);
	}

	public List<FairProd> findAllR(String factory, String month) {

		return mapper.findAllR(factory, month);
	}

	public List<List<FairProd>> chart1(String factory, String month) {

		List<String> rank = mapper.rank(factory);

		List<String> lineList = new ArrayList<>();
		List<List<FairProd>> finalresult = new ArrayList<>();

		if (factory.equals("LHO")) {
			finalresult.add(mapper.chart1(rank.get(0), month));
		} else if (factory.equals("SWH")) {
			finalresult.add(mapper.chart1(rank.get(0), month));	
		} else if (factory.equals("SYM")) {
			finalresult.add(mapper.chart1(rank.get(0), month));	
		} else {
			if (rank.size() > 4) {
				lineList.add(rank.get(0));
				lineList.add(rank.get(1));
				lineList.add(rank.get(rank.size() - 2));
				lineList.add(rank.get(rank.size() - 1));
				finalresult.add(mapper.chart1(lineList.get(0), month));
				finalresult.add(mapper.chart1(lineList.get(1), month));
				finalresult.add(mapper.chart1(lineList.get(2), month));
				finalresult.add(mapper.chart1(lineList.get(3), month));
			} else {
				for (String line : rank) {
					finalresult.add(mapper.chart1(line, month));
				}
			}
		}
		finalresult.add(mapper.findAllName(factory));

		return finalresult;
	}
	
	public List<FairProd> chart6(String factory, String month) {

		return mapper.chart6(factory,month);
	}

	public List<FairProd> chart8(String month) {

		return mapper.chart8(month);
	}
	
	public String find1Alarm(){
		return mapper.find1Alarm();
	}
	
	public String find1AlarmConfirm(){
		return mapper.find1AlarmConfirm();
	}
	
	public String find2Alarm(){
		return mapper.find2Alarm();
	}	
	
	public String find2AlarmConfirm(){
		return mapper.find2AlarmConfirm();
	}	

	public String find3Alarm(){
		return mapper.find3Alarm();
	}	
	
	public String find3AlarmConfirm(){
		return mapper.find3AlarmConfirm();
	}

	public List<FairProd> findAllDailyAlarm(){
		
		return mapper.findAllDailyAlarm();
	}
}