package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairProd;

@Mapper
public interface DashMapper {

	List<FairProd> findAllName(String plant);
	List<FairProd> findAllP(String plant, String material);
	List<FairProd> findAllQ(String plant, String material);
	List<FairProd> findAllC(String line, String material);
	List<FairProd> findAllD(String plant, String material);
	List<FairProd> chart1(String line, String month, String material);
	List<FairProd> chart2(String line, String month);
	List<FairProd> chart3(String plant, String month, String material);
	List<FairProd> chart4(String plant, String month, String material);
	List<FairProd> chart5(String line, String month, String material);
	List<FairProd> chart6(String plant, String month, String material);
	List<String> rank(String plant, String month);
	List<String> rank2(String plant, String month);

	String find1Alarm();
	String find1AlarmConfirm();
	String find2Alarm();
	String find2AlarmConfirm();
	String find3Alarm();
	String find3AlarmConfirm();
	List<FairProd> findAllDailyAlarm();
	
}