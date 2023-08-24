package com.idr.pdd.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairProd;


@Mapper
public interface DashMapper {

	List<FairProd> findAllPQCD(String factory);
	List<FairProd> findAllR(String factory, String month);
	List<FairProd> chart1(String factory, String month);
	List<FairProd> chart6(String factory, String month);
	List<FairProd> chart8(String month);
	List<String> rank(String factory);

	String find1Alarm();
	String find2Alarm();
	String find3Alarm();
	List<FairProd> findAllDailyAlarm();
	
}